"use client"

import {motion} from 'motion/react'
import Image from 'next/image'

const personalWorks = [
    {
        title: 'Personal Lab',
        subtitle: 'A collection of my personal crafted UI components',
        description: 'Description 1',
        image: '/images/work-1.jpg',
        links: ['https://www.google.com'],
    },
    {
        title: 'Apple UI Exploration',
        description: 'An exploration of Apple`s design principles, translated into responsive web interfaces.',
        image: '/images/work-2.jpg',
        links: 'https://www.google.com',
    },
    {
        title: 'AskNow',
        description: 'An AI powered survey platform for collecting user feedback and creating a survey with AI features',
        image: '/images/work-3.jpg',
        links: 'https://www.google.com',
    },
    {
        title: 'Systems Before Screen',
        description: 'Crafting my own personal handbook on web on using AI in product design with importance of user research and design systems',
        image: '/images/work-4.jpg',
        links: 'https://www.google.com',
    }
]

export default function PersonalWorks() {
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>

        </div>
    )
}