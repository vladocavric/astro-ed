import avatar from '/public/avatar.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/global.css';
import { useMediaQuery } from '../util/useMediaQuery';

const navMotion = {
	visible: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.15,
		},
	},
	hidden: {
		opacity: 0,
	},
};

const itemMotion = {
	visible: {
		opacity: 1,
		x: 0,
	},
	hidden: {
		opacity: 0,
		x: -100,
	},
};

const Nav = () => {
	const [toggle, setToggle] = useState(false);
	const matches = useMediaQuery('(min-width: 1280px)', {
		defaultValue: false,
		initializeWithValue: false,
	});
	return (
		<nav className='relative mx-8 mb-24 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32'>
			<svg
				className='absolute bottom-0 left-1/2  -translate-x-1/2'
				xmlns='http://www.w3.org/2000/svg'
				width='250'
				height={4}
				viewBox='0 0 250 4'
				fill='none'>
				<path
					d='M2 2l428 2'
					strokeWidth={2}
					stroke='#282828'
					strokeLinecap='round'
				/>
			</svg>
			<div>
				<img src={avatar.src} alt='Avatar' />
			</div>
			<h1 className='text-large font-bold'>
				<a href='/'>
					<h1>Hua.</h1>
				</a>
			</h1>
			{matches && (
				<div className='flex gap-12'>
					<a href='/'>Home</a>
					<a href='/services'>Services</a>
					<a href='/contact'>Contact</a>
				</div>
			)}

			{!matches && (
				<div
					className='space-y-1.5 cursor-pointer  z-50'
					aria-label='Toggle Navigation'
					role='button'
					onClick={() => setToggle((prevState) => !prevState)}>
					<motion.span
						animate={{
							rotateZ: toggle ? 45 : 0,
							y: toggle ? 8 : 0,
						}}
						className='block h-0.5 w-8 bg-black'></motion.span>
					<motion.span
						animate={{
							width: toggle ? 0 : '24px',
						}}
						className='block h-0.5 w-6 bg-black'></motion.span>
					<motion.span
						animate={{
							rotateZ: toggle ? -45 : 0,
							y: toggle ? -8 : 0,
							width: toggle ? '32px' : '16px',
						}}
						className='block h-0.5 w-4 bg-black'></motion.span>
				</div>
			)}
			<AnimatePresence>
				{toggle && !matches && (
					<div className='fixed bg-white top-0 left-0 w-full h-screen items-center justify-center flex'>
						<motion.div
							variants={navMotion}
							animate='visible'
							initial='hidden'
							exit='hidden'
							className='flex flex-col gap-24 text-lg'>
							<motion.a variants={itemMotion} href='/'>
								Home
							</motion.a>
							<motion.a variants={itemMotion} href='/services'>
								Services
							</motion.a>
							<motion.a variants={itemMotion} href='/contact'>
								Contact
							</motion.a>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Nav;
