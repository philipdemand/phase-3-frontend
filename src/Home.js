import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <div>
      <header className="header">
        <h1 className="title">Welcome to Goodz</h1>
        <p className="subtitle">Discover Unique Items for Sale</p>
      </header>
      <section className="items-section">
        <div className="item">
          <h2 className="item-title">River Kayak - Summer Fun!</h2>
          <p className="item-price">$200.00</p>
        </div>
        <div className="item">
          <h2 className="item-title">Vintage Discman CD Player!</h2>
          <p className="item-price">$20.00</p>
        </div>
      </section>
      <section className="sell-item-form">
        <h2 className="form-title">Sell an Item</h2>
        <p className="form-description">
          Have something unique to sell? <Link to="/items/new"><button>Click Here</button></Link>
        </p>
      </section>
      <footer className="footer">
        <p className="footer-text">© 2023 Goodz. All rights reserved.</p>
      </footer>
    </div>
        </div>
    )
}

export default Home