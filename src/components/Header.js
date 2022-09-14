import React from 'react'
import { useSelector } from 'react-redux'
import images from './images';

function Header() {

    const cartItems = useSelector(state => state.cartItems);

  return (
    <nav>
        <div className="header-settings">
            <img src={images.logo} alt="domenebi.ge logo" className='logo'/>

            <ul>
                <li><img src={images.bell} alt="bell" /></li>
                <li><img src={images.cart} alt="cart" id="cart-icon" />{cartItems.length !== 0 ? <div className='cart-counter'><span>{ cartItems.length }</span></div> : ''}</li>
                <li><img src={images.user} alt="user" /></li>
                <li><img src={images.geoFlag} alt="georgian flag" /></li>
            </ul>
        </div>

        <div className="main-nav">
            <ul>
                <li>დომენი</li>
                <li>ტრანსფერი</li>
                <li>ჰოსტინგი</li>
                <li>Gmail</li>
                <li>ვებგვერდი</li>
                <li>დომენის მარკეტი</li>
            </ul>

            <ul>
                <li>ჩვენს შესახებ</li>
                <li>ფასები</li>
                <li>ბლოგი</li>
                <li id="help">დახმარება</li>
            </ul>
        </div>

    <div className="mobile-nav">
        <div className="logo-container">
            <button><img src={images.burger} alt="burger menu" className='burger-menu'/></button>
            <img src={images.logo} alt="domenebi.ge logo" className='logo'/>
        </div>
        
        <ul>
            <li><button><img src={images.mobileBell} alt="bell" /></button></li>
            <li><button><img src={images.mobileCart} alt="cart" />{cartItems.length !== 0 ? <div className='cart-counter'><span>{ cartItems.length }</span></div> : ''}</button></li>
            <li><button><img src={images.mobileUser} alt="user" /></button></li>
        </ul>
    </div>

    </nav>
  )
}

export default Header