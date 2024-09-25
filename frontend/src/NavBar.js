import { Link } from "react-router-dom"

export function NavBar() {
return (
  <ul className="NavBar">
    <Link to={"/"}>Home</Link>
    <Link to={"/battle"}>Battle</Link>
    <Link to={"/deckBuilder"}>Deck Builder</Link>
  </ul>
  )
}