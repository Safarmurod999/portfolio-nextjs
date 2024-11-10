'use client'

import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import Link from 'next/link';
import { ServiceCardProps } from '@/app/types/types';

const ServiceCard = ({ id, title, description }: ServiceCardProps) => {
    return (
        <li className='service-card'>
            <div>
                <h4>0{id + 1}/</h4>
                <div className='service-card-content'>
                    <span>{title}</span>
                    <p>{description}</p>
                </div>
            </div>
            <Link aria-label='page-link' href={'/services'} className='service-card-icon'><GoArrowUpRight /></Link>
        </li>
    )
}

export default ServiceCard