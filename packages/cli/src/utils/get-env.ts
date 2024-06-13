import Configstore from 'configstore';
import { ColorFullText, hasPro, logger } from "./logger";

const envName = "MAGICUI_PRO_ENV";
const config = new Configstore("magicui");

export const getEnv = () => config.get(envName) as string | undefined
export const setEnv = (env: string) => config.set(envName, env);
export const clearAll = () => config.clear()

export const login = async (env: string) => {
	try {
		// always use PATCH method here
		const res = await fetch(`${process.env.PRO_REGISTRY_URL}/api/env`, {
			method: "PATCH",
			headers: {
				cookie: `x-magicui-env=${env}`
			}
		})


		if (!res.ok) {
			if (res.status === 401) {
				throw new Error("Auth error, Invalid environment variable", {
					cause: "Invalid env"
				});
			}
			throw new Error(`Auth error, status:${res.status}, ${res.statusText}`, {
				cause: res.statusText
			});
		}

		setEnv(env);
		console.log(ColorFullText(hasPro))
	} catch (error: any) {
		logger.error(error?.message ?? "Failed to login. Please try again.")
	}
}