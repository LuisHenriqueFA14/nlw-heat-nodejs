import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
	sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;


	if(!authToken) {
		return res.status(401).send({ 
			errorCode: "token.invalid",
		});
	}

	// Bearer 345984385345jdfgjkdfg
	// [0] Bearer
	// [1] 345984385345jdfgjkdfg
	
	const [, token] = authToken.split(" ");

	try {
		const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

		req.user_id = sub;

		return next();
	} catch(err) {
		return res.status(401).json({ errorCode: "token.expired" });
	}
}
