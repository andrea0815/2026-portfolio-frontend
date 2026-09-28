// RootLayout.tsx

import { Outlet } from "react-router";
import { VFXScene } from "../utils/vfx/VFXScene";
import Header from "../components/header/Header";

export default function RootLayout() {
    return (
        <>
            <div className="">
                <Header />
                <VFXScene>
                <main className="flex flex-col items-center">
                    <Outlet />
                </main>
                </VFXScene>
            </div>
        </>
    );
}