import ProtectedNav from "./_components/ProtectedNav";


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ProtectedNav />
                {children}
            </body>
        </html>
    )
}
