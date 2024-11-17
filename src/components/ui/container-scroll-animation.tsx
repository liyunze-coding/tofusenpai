"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
	heading,
	subheading,
	children,
}: {
	heading: string | React.ReactNode;
	subheading: string;
	children: React.ReactNode;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
	});
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const scaleDimensions = () => {
		return isMobile ? [0.7, 0.3] : [1.05, 1];
	};

	const inputRange = [0, 6];

	const rotate = useTransform(scrollYProgress, inputRange, [0, 150]);
	const scale = useTransform(scrollYProgress, inputRange, scaleDimensions());
	const translate = useTransform(scrollYProgress, inputRange, [0, 10]);

	return (
		<div
			className="pt-20 h-[35rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
			ref={containerRef}
		>
			<div
				className="py-5 md:py-40 w-full relative"
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
			<h1 className="text-4xl font-semibold text-black dark:text-white z-50">
				{heading} <br />
				<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
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
			className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full md:p-6  rounded-[30px] shadow-2xl"
		>
			<div className=" h-full w-full  overflow-hidden rounded-2xl md:rounded-2xl md:p-4 ">
				{children}
			</div>
		</motion.div>
	);
};