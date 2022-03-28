import React from 'react'
import { ShareModal } from '../Modal';


export const SampleStoreView = (props) => {


    const { store} = props;


    return (

        <>
            <div className="store-card-for-profile-details">
                <div className='store-displA-flex-and-content-in-center'>
                    <div className="respo-flex-div-with-tore-profile-and-othjer">
                        <div className="this-div-for-profile">
                            {store &&
                                store.storeProfilePicture &&
                                store.storeProfilePicture.img ? (
                                <img
                                    src={store.storeProfilePicture.img}
                                    alt="User's_avatar"
                                    sizes="115px"
                                    className="profile-of-store-new-idkfhf"
                                ></img>
                            ) : (
                                <h2 className='shopfisrtcharacterinshopprofile'>{store && store.storeName ? store.storeName.charAt(0).toUpperCase() : null}</h2>
                            )}
                        </div>
                        <div className="new-store-pro-fil-e-div-for-flec-inrespo">
                            <div className="user-shop-name-in-store-card">
                                <h2
                                >
                                    {store && store.storeName ? store.storeName : null}

                                </h2>
                            </div>
                            <div className="user-shop-name-in-store-card-dedfefa">
                                <div className="floowers-and-all-otjher-infoe-background-gey">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-4808 -20688 14.286 20"
                                        class="ProfileCard-locationIcon-3Po"
                                    >
                                        <g>
                                            <path d="M-4800.857-20688a7.143 7.143 0 0 0-7.143 7.143c0 5.714 7.143 12.857 7.143 12.857s7.143-7.143 7.143-12.857a7.142 7.142 0 0 0-7.143-7.143zm0 10a2.857 2.857 0 1 1 2.857-2.859 2.858 2.858 0 0 1-2.857 2.859z"></path>
                                        </g>
                                    </svg>{" "}
                                    <p style={{ fontSize: "12px" }}>Pune</p>
                                </div>
                            </div>
                            <div className="user-shop-name-in-store-card-gap">
                                <button
                                >
                                    Share
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="display-none-for-mobile-respo-only-instrore-aS">
                    <div className="for-margin-bootom-only-in-social-icons-adding">
                        <ul className="in-icons-of-socil-share">
                            {" "}
                            <li>
                                <a href="/#" data-network="facebook" aria-label="Facebook">
                                    <span className="ct-icon-container">
                                        <svg
                                            fill="grey"
                                            class="ct-icon"
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 20 20"
                                            aria-label="Facebook Icon"
                                        >
                                            <path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z"></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="/#" data-network="instagram" aria-label="Instagram">
                                    <span class="ct-icon-container">
                                        <svg
                                            fill="grey"
                                            class="ct-icon"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            aria-label="Instagram Icon"
                                        >
                                            <circle cx="10" cy="10" r="3.3"></circle>
                                            <path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z"></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="user-shop-name-in-store-card">
                        <div className="member-since">
                            <p>Member since {" "}
                               1990
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}
