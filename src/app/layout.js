import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProvider from "@/components/ClientProvider"; 

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {  
    title: "Online Prescription Tools for Doctors | Prescripto",
    description: "Prescripto empowers healthcare professionals to send and manage medical prescriptions online. Fast, secure, and compliant e-prescribing tools designed for doctors and clinics.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased mx-4 sm:mx-[10%]`}>
                <ClientProvider>
                    <Header />
                    {children}
                    <Footer />
                </ClientProvider>
            </body>
        </html>
    );
}
