import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF, FaSlackHash, FaCaretRight } from "react-icons/fa";
import { CgCopyright } from "react-icons/cg";

const Footer = () => {
    return (
        <div className='mt-40'>
            <footer className="footer p-10 text-white bg-black pl-28">
                <nav>
                    <header className="footer-title">INFOMATION</header>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Cars</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Crossovers & SUVs</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Trucks & Vans</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Hybrids & EVs</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Commercial Trucks</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Fleet Vehicles</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Future Vehicles</a>

                </nav>
                <nav>
                    <header className="footer-title">SHOWROOM</header>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> Colorado</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' /> San Francisco</a>
                    <a className="link link-hover flex items-center"><FaCaretRight className='w-3 h-4' />All Location</a>
                </nav>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <a><FaTwitter className='w-6 h-6' /></a>
                        <a><FaYoutube className='w-6 h-6' /></a>
                        <a><FaFacebookF className='w-6 h-6' /></a>
                    </div>
                </nav>
            </footer>
            <footer className="footer py-6 border-t text-base-content border-base-300 pl-28">
                <aside className="items-center grid-flow-col">
                    <FaSlackHash className='w-6 h-6' />
                    <p className='flex items-center'><CgCopyright className='w-6 h-6 mr-1' /> 2023 AutoPro. All Rights Reserved. Developed by HEMEL</p>
                </aside>

            </footer>
        </div>
    );
};

export default Footer; 