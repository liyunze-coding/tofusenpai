"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
	href,
	heading,
	subheading,
	children,
}: {
	href?: string | null;
	heading: string | React.ReactNode;
	subheading: string;
	children: React.ReactNode;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
	});

	const inputRange = [0, 6];

	const rotate = useTransform(scrollYProgress, inputRange, [0, 150]);
	const scale = useTransform(scrollYProgress, inputRange, [0.7, 0.3]);
	const translate = useTransform(scrollYProgress, inputRange, [0, 10]);

	return (
		<div
			className="pt-20 h-[35rem] flex items-center justify-center relative p-2 "
			ref={containerRef}
		>
			{href && (
				<a
					className="py-5 w-full relative block"
					style={{
						perspective: "1000px",
					}}
					href={href}
				>
					<Header
						translate={translate}
						heading={heading}
						subheading={subheading}
					/>
					<Card rotate={rotate} translate={translate} scale={scale}>
						{children}
					</Card>
				</a>
			)}
			{!href && (
				<div
					className="py-5 w-full relative block"
					style={{
						perspective: "1000px",
					}}
				>
					<Header
						translate={translate}
						heading={heading}
						subheading={subheading}
					/>
					<Card rotate={rotate} translate={translate} scale={scale}>
						{children}
					</Card>
				</div>
			)}
		</div>
	);
};

export const Header = ({ translate, heading, subheading }: any) => {
	return (
		<motion.div
			style={{
				translateY: translate,
			}}
			className="div max-w-5xl mx-auto text-center"
		>
			<h1 className="text-3xl font-semibold text-black dark:text-white z-50">
				{heading} <br />
				<span className="text-xl font-bold mt-1 leading-none">
					{subheading}
				</span>
			</h1>
		</motion.div>
	);
};

export const Card = ({
	rotate,
	scale,
	children,
}: {
	rotate: MotionValue<number>;
	scale: MotionValue<number>;
	translate: MotionValue<number>;
	children: React.ReactNode;
}) => {
	return (
		<motion.div
			style={{
				rotateX: rotate,
				scale,
				boxShadow:
					"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
			}}
			className="max-w-5xl -mt-12 w-fit mx-auto h-[30rem] rounded-[30px] shadow-2xl"
		>
			<div className="h-full w-full overflow-hidden rounded-2xl">
				{children}
			</div>
		</motion.div>
	);
};
