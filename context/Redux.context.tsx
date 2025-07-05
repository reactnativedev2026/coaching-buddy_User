import store from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderPropsType = {
    children: ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderPropsType) {
    return <Provider store={store}>{children}</Provider>;
}
