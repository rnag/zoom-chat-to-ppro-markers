declare function exit(code: number): void;

interface String {
	/** Removes the leading and trailing white space and line terminator characters from a string. */
	trim(): string;
}

interface Function {
	/**
	 * For a given function, creates a bound function that has the same body as the original function.
	 * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
	 * @param thisArg An object to which the this keyword can refer inside the new function.
	 * @param argArray A list of arguments to be passed to the new function.
	 */
	bind(this: Function, thisArg: any, ...argArray: any[]): any;
}
