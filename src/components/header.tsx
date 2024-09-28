import { ThemeButton } from "./theme-button"
import { Button } from "./ui/button"

function Header() {
  return (
    <div className="flex justify-between">
      <h1 className="flex-1 place-items-center w-screen text-center text-3xl"> AMAZ-OFF%</h1>
      <ThemeButton />
    </div>
  )
}
export default Header