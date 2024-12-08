import StoreProvider from "@/lib/StoreProvider";
import "./globals.css";

import SettingsProvider from "@/lib/SettingsProvider";

export default function RootLayout({ children }) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadFromLocalStorage());
  //   dispatch(fetchSettings());
  // }, [dispatch]);
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
