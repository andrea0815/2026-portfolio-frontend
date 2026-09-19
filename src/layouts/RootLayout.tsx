// RootLayout.tsx

import { Outlet } from "react-router";
import { VFXScene } from "../utils/vfx/VFXScene";
import Header from "../components/Header";

export default function RootLayout() {
    return (
        <VFXScene>
            <Header />
            <Outlet />
        </VFXScene>
    );
}