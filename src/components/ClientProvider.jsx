'use client';  

import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "@/components/ui/sonner";

export default function ClientProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster />
        </Provider>
    );
}
