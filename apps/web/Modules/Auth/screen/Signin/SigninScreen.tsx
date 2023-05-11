"use client";
import { useState } from "react";
import Image from "next/image";
import { BuiltInProviderType } from "next-auth/providers";

import { Button, Typography, Col, Row } from "ui/components/Core";
import { LiteralUnion, signIn } from "next-auth/react";

import useStyle from "./signin-screen.style";

const PROVIDERS = ["google", "github", "facebook"];

const SigninScreen = () => {
	const { styles } = useStyle();

	const [authLoading, setAuthLoading] = useState<LiteralUnion<BuiltInProviderType, string>>();

	console.log("[ SigninScreen ]");

	return (
		<div className={styles.container}>
			<Typography.Title>Welcome back</Typography.Title>
			<Typography.Text className={styles.gretting}>
				All done, signin to save the world!
			</Typography.Text>

			<div className={styles.btnGroup}>
				<Button block size="large">
					Signin with Google
				</Button>
				<Button block size="large">
					Signin with Facebook
				</Button>
			</div>
		</div>
	);
};

export default SigninScreen;
