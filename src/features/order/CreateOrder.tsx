// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { Cart } from "../cart/Cart";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../../utils/geolocation";
import { AppDispatch } from "../../store";

type FormErrors = {
  phone?: string;
};

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation();
  const formErrors = useActionData() as FormErrors;
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-4">
          <label>First Name</label>
          <input
            className="input"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-4">
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label>Address</label>
          <div className="grow">
            <input
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input"
              type="text"
              name="address"
              required
            />
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[5px] z-50">
              <Button
                type="button"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>
        {addressStatus === "error" && (
          <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {errorAddress}
          </p>
        )}
        <div className="mb-12 mt-6 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority.toString()}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button size="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Place order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const order = {
    cart: JSON.parse(data.cart as string) as unknown as Cart[],
    priority: data.priority === "true",
    customer: data.customer as string,
    phone: data.phone as string,
    address: data.address as string,
    position: data.position as string,
  };

  const errors = {
    phone: "",
  };

  if (!isValidPhone(order.phone)) {
    errors["phone"] = "Invalid phone number";
  }

  // if (Object.keys(errors).length > 0) {
  //   return errors;
  // }

  const newOrder = await createOrder(order); // Se tudo der certo, cria a ordem no banco de dados

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
