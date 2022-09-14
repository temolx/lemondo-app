import React, { useState, useMemo } from 'react'
import { categories, domainList } from '../domainList_'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, RemoveFromCart } from '../actions/CartActions'
import { addCategory, removeCategory } from '../actions/FilterActions'
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import images from './images'


function Domains() {

    const[activeDomain, setActiveDomain] = useState('');
    const[nameFilter, setNameFilter] = useState('');
    const[filtersVisible, setFiltersVisible] = useState(false);

    const[priceValue, setPriceValue] = useState({
        first: 0,
        second: 50000
    });

    const[symbolValue, setSymbolValue] = useState({
        first: 0,
        second: 26
    });

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const filteredCategories = useSelector(state => state.filteredCategories);

    const AddCart = (domain) => {
        dispatch(AddToCart(domain));
    }

    const RemoveCart = (domain) => {
        dispatch(RemoveFromCart(domain));
    }

    const filterCategory = (inputStatus, categoryID) => {
        if (inputStatus) { // checking event
            dispatch(addCategory(categoryID));
        }
        else { // unchecking event
            dispatch(removeCategory(categoryID));
        }
    }


        const filteredList = useMemo(() => {
            return domainList.filter((el) => {
                const fullDomain = el.domainName + el.domainExtension;

                if (nameFilter === '') {
                    return el;
                }
                else if (fullDomain.toLowerCase().includes(nameFilter.toLowerCase())) {
                    return el;
                }
            }).filter((el) => {
                return el.price >= priceValue.first && el.price <= priceValue.second
            }).filter((el) => {
                const domainArr = [...el.domainName];

                return domainArr.length >= symbolValue.first && domainArr.length <= symbolValue.second
            }).filter((el) => {
                if (filteredCategories.length === 0) {
                    return el;
                }
                else if (filteredCategories.some((element) => el.categories.includes(element))) {
                    return el;
                }
            })
        }, [nameFilter, priceValue.first, priceValue.second, symbolValue.first, symbolValue.second, filteredCategories])

  return (
    <div className='domains-page'>
        <Container>

        {filtersVisible ? <div className={filtersVisible ? "mobile-labels d-flex d-md-none" : "mobile-labels d-none"}>
            <h3>ფილტრი</h3>
            <button onClick={() => setFiltersVisible(false)}><img src={images.closeBtn} alt="exit button"/></button>
        </div> : '' }

        <div className="banner">
            <div className="banner-container">
                <div className="banner-img-container">
                    <img src={images.banner} alt="banner" />
                    <div className="bg"></div>
                </div>
                <h1 id="banner-text">გაყიდე და იყიდე <br className='d-md-none' />დომენი მარტივად</h1>
            </div>
        </div>

        <div className="domains">
                <Row className='domains-main'>
                    <Col className="domains-container" lg={4} md={4}>
                    <h3 className='domain-quantity d-none d-md-flex'>დომენები მარკეტზე: <span>{ filteredList.length }</span></h3>

                    <div className={filtersVisible ? "filters d-block" : "filters d-none d-md-block"}>
                        <div className="name-input">
                            <input type="text" placeholder='სახელით ძიება' onChange={(e) => setNameFilter(e.target.value)} />
                        </div>

                        <div className="range-input">
                            <label htmlFor="">ფასი</label>

                            <div className="range-input-text">
                                <div className="price-container">
                                    <input type="number" value={priceValue.first} onChange={(e) => setPriceValue({
                                                ...priceValue,
                                                first: e.target.value
                                        })} />
                                    <span className='d-lg-flex d-md-none'>₾</span>
                                </div>
                                
                                <div className="price-container">
                                    <input type="number" value={priceValue.second} onChange={(e) => setPriceValue({
                                                ...priceValue,
                                                second: e.target.value
                                        })} />
                                    <span className='d-lg-flex d-md-none'>₾</span>
                                </div>
                            </div>

                            <Slider
                                getAriaLabel={() => 'Temperaturerange'}
                                value={[priceValue.first, priceValue.second]}
                                valueLabelDisplay="off"
                                min={0}
                                max={50000}
                                sx={{
                                    width: '100%',
                                    color: '#99cc66',
                                    '& .MuiSlider-thumb': {
                                        color: '#fff',
                                        border: '2px solid #99cc66',
                                        width: '25px',
                                        height: '25px',

                                        '&::after': {
                                            width: '1px',
                                            height: '10px',
                                            backgroundColor: '#99cc66',
                                            position: 'absolute',
                                            left: '8px',
                                            boxShadow: 'none'
                                        },
                                        '&::before': {
                                            width: '1px',
                                            height: '10px',
                                            backgroundColor: '#99cc66',
                                            position: 'absolute',
                                            left: '12px',
                                            boxShadow: 'none'
                                        }
                                    },
                                }}
                                className='custom-slider'

                                onChange={(e) => setPriceValue({
                                    first: e.target.value[0],
                                    second: e.target.value[1]
                                })}
                                />
                        </div>

                        <div className="range-input">
                            <label htmlFor="">სიმბოლოების რაოდენობა</label>

                            <div className="range-input-text">
                                <input type="number" value={symbolValue.first} onChange={(e) => setSymbolValue({
                                            ...symbolValue,
                                            first: e.target.value
                                    })} />
                                <input type="number" value={symbolValue.second} onChange={(e) => setSymbolValue({
                                            ...symbolValue,
                                            second: e.target.value
                                    })}  />
                            </div>

                            <Slider
                                getAriaLabel={() => 'Temperaturerange'}
                                value={[symbolValue.first, symbolValue.second]}
                                valueLabelDisplay="off"
                                min={0}
                                max={26}
                                sx={{
                                    width: '100%',
                                    color: '#99cc66',
                                    '& .MuiSlider-thumb': {
                                        color: '#fff',
                                        border: '2px solid #99cc66',
                                        width: '25px',
                                        height: '25px',

                                        '&::after': {
                                            width: '1px',
                                            height: '10px',
                                            backgroundColor: '#99cc66',
                                            position: 'absolute',
                                            left: '8px',
                                            boxShadow: 'none'
                                        },
                                        '&::before': {
                                            width: '1px',
                                            height: '10px',
                                            backgroundColor: '#99cc66',
                                            position: 'absolute',
                                            left: '12px',
                                            boxShadow: 'none'
                                        }
                                    },
                                }}
                                className='custom-slider'

                                onChange={(e) => setSymbolValue({
                                    first: e.target.value[0],
                                    second: e.target.value[1]
                                })}
                            />
                        </div>


                        <div className="categories-container">
                            <label htmlFor="">კატეგორიები</label>
                                { categories.map((category) => (
                                    <div className='category-list' key={ category.id }>
                                        <input type="checkbox" name='categoryCheck' className={filteredCategories.includes(category.id) ? 'checked-custom' : ''} onChange={(e) => filterCategory(e.target.checked, category.id)} checked={filteredCategories.includes(category.id)} />
                                        <label htmlFor="categoryCheck">{ category.name }</label>
                                    </div>
                                )) }
                        </div>

                        <div className={filtersVisible ? "search-btn d-block d-md-none" : "search-btn d-none"}>
                            <button className='search' onClick={() => setFiltersVisible(false)}>ძიება</button>
                        </div>
                    </div>
                    </Col>

                    <Col className="right" lg={8} md={8}>
                        <div className="sort-container d-none d-md-flex">
                                <div className="sort">
                                    <h3>სორტირება:</h3>

                                    <button>დამატების თარიღით<img src={images.ascending} alt="ascending icon" /></button>
                                    <button>ვადის ამოწურვით</button>
                                    <button>ფასით</button>
                                    <button>ანბანით</button>
                                </div>

                                <button className='faq d-none d-xl-block'>როგორ გავყიდო დომენი?</button>
                        </div>

                    <div className="mobile-filter">
                        <button onClick={() => setFiltersVisible(!filtersVisible)}>ფილტრაცია<img src={images.sortMobile} alt="dropdown" /></button>
                        <button>სორტირება<img src={images.sortMobile} alt="dropdown" /></button>
                    </div>

                    { filteredList.length !== 0 ? <div className="domain-list-container">
                        { filteredList.map((domain) => (
                            <div className={activeDomain === domain.domainName ? 'active-domain domain-list' : 'domain-list'} key={ domain.domainName }>
                                <div className="name">
                                    <button onClick={() => setActiveDomain(domain.domainName)}><img src={activeDomain === domain.domainName ? images.dropdownActive : images.dropdown} alt="dropdown icon" /></button>
                                    <h3>{ domain.domainName + domain.domainExtension }</h3>
                                </div>
        
                                <div className="info">
                                    {!cartItems.some((el) => el.domainName === domain.domainName) ? <div className={activeDomain === domain.domainName ? 'price d-none d-lg-block' : 'price'}>
                                        <h3>{ domain.price }<span>₾</span></h3>
                                        <h3>846<span>$</span></h3>
                                    </div> : ''}

                                    {!cartItems.some((el) => el.domainName === domain.domainName) ? <button className={activeDomain === domain.domainName ? 'active-cart' : ''} onClick={() => AddCart(domain)}><span>{activeDomain === domain.domainName ? 'დამატება' : ''}</span><img src={images.cartWhite} alt="cart" /></button> : <button className='active-cart in-cart-btn' onClick={() => RemoveCart(domain)}><img src={images.checkmark} alt="checkmark" /><span>კალათშია</span></button>}
                                </div>
                            </div>
                        )) }
                    </div> : <div className="not-found">
                                <img src={images.notFound} alt="file with a sad face :(" />

                                <h2>დომენი ვერ მოიძებნა</h2>
                                <p>მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ მოიძებნა, შეცვალეთ ძიების პარამეტრები და სცადეთ თავიდან</p>
                            </div> }
                    </Col>
                </Row>
        </div>
        </Container>
    </div>
  )
}

export default Domains