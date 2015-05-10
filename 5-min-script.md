# Personal Intro #

Good evening everyone, my name is Clark and I'm an Interface developer at ansarada.

This is my first time talking in front of such a large crowd, so please be gentle...

I'm here tonight to encourage everyone to write more modern Javascript.

# Agenda #

So the next version of Javascript, ECMAScript6, or ES6, is quickly gaining traction.

Most of the spec has been locked down and agreed upon, with ratification being targetted for June this year.

Transpiler tools like Traceur and Babel allow us to write ES6 now, and compile down to Javascript for ES5 browsers. This means you can start writing future proofing code and still have it work in IE9+.

ES6 introduces many new language features which will start making code thats written with ES6 look completely different to Javascript thats written now.

I think its about time that we all look towards what new features are coming to Javascript and how we can use them.

I want to introduce everyone to a lesser talked about, but no less important feature, Symbols.

I will show you how using symbols can make your code more readable, more debuggable, and possibly even run faster.

# Symbols, what are they #

What are Symbols? They are a newly added feature in ES6 that allows you to store a property against an object, not by using a string based key as you would currently, but using this new thing called Symbols. They look like this:

## Basic usage ##
What are Symbols? They are a newly added feature in ES6 that allows you to store a property against an object, not by using a string based key, but using a Symbol and it looks like this:

(next)

The first line of code creates the Symbol. You create a symbol by calling the function "Symbol". The function "Symbol" accepts an optional string argument that is used as a descriptor for this Symbol. I've used the string "name" here. Calling the function returns to you a Symbol ready for use. I'm assigning the newly created Symbol here to a variable called nameSymbol.

(next)

This next block of code shows how you would assign values to an object using the symbol as a key. The syntax is identical to how you would normally use strings as property keys. You can similiarly also access a property on an object by using the symbol as the key.

(next)

You can also use Symbols in a object literal, but it requires using the new computed property language feature in ES6, demonstrated here.

(next)

You might have noticed the lack of the 'new' keyword before the Symbol function call. This is because Symbols are a new language primitive in javascript, on the same level as numbers, strings, booleans, null, undefined, but unlike those other primitives, there is currently no way to declare a Symbol primitive with built-in Javascript syntax.

So whilst you could say, declare a number with the character "1" or the a boolean with the "true" and "false" keyword, the Symbol primitive can only be constructed using the Symbol function. The language spec writers actually made calling Symbol with the `new` operator throw an error, as it will help developers avoid a common mistake where they create a new object instead of a primitive.

(next)

Its also important to note that, the descriptor string has no relevance on the identity of the Symbol. As this line demonstrates, each invocation of Symbol will create a new, distinct symbol, with the Symbol descriptor having no effect besides being used as debugging information.

(next)

This last line just shows that the language is not transforming the Symbol into a string when doing the value assignment.

# Use cases #

So you're probably thinking now, what is the point of this? Why introduce something that looks so similiar to an existing feature that i know and use so well already?

I'll show you a good use case

## Encapsulation without (ab)using closures ##

The principle of Encapsulation is about provide a cleaner public interfaces to your classes and hiding implementation detail from the consumers of your code. Reducing the surface area of your code means its much easier for other developers to consume your code, reducing misunderstanding and misuse. One of the core ways of doing this is by hiding properties or methods of an object, and creating a division between what is exposed code, and what is implementation detail.

Javascript doesn't really have a clear concept of 'private' properties as in other languages, so to achieve encapulations, developers have resorted to using closures to enclose over a private variable.

In this example, I've chosen to hide the `hasPower` variable so the developer cannot just change it without going through the `turnOn` method. There is no way for another class to access the `hasPower` variable, making it effectively hidden from other code.

This approach does achieve encapsulation, but there are several problems with this approach.

- One, debugging is difficult with this code. As your classes become more bigger and your program more complex, its convenient to be able to see what's going on so when you're debugging. Using closures, if you were to set a breakpoint in code that uses this class, you cannot examine what that hasPower variable currently contains.

- Two, the closed over properties are completely inaccessible, making mixin or inheritance patterns less flexible. So say you want to create a sub-class called 'Plasma TV' thats based off this class, the Plasma TV class that inherits from this class would not be able to access the hasPower property.

- Three, theres a small performance hit with creating closures, and this pattern creates a separate closure for each instance of Television. So for each television thats created in your application, a new closure has to be created per function defined in the constructor. This has performance implications, especially when the new Javascript engine tries to apply Just In Time optimizations to these functions.

(next)

Using Symbols combined with another es6 feature, the class syntax, we can create a much better way to express the previous concept.

First you create a symbol for the property you want to hide.

(next)

Then, any time you want to access or set that hidden property, you use the symbol as the key. Thats pretty much all there is to it. Now, only those with access to the symbol will be able to access the property inside this class.

This approach fixes all the problems with the previous example:

- Because Symbols are attached to a specific object as opposed to being assigned to a closure, the debugging tools show you what symbols are attached to an object when you log it to console, or mouse over it during debugging.

- Since Symbols are primitive values, if you want to allow sub-classes to interact with the private property, you simply have to expose it somewhere. I fully expect that soon, someone will be building a new framework that uses this behaviour to create the public/private/protected concepts that exist in other languages.

- With this code pattern, only 1 closure is created and shared between every instance of the class. This means that the Just In Time compilers should be able to make better optimisations of these functions.

# Summary #

I hope I've given you a good introduction to Symbols. I think this is going to be one of those features where even if you will not employ in your own code, you'll start seeing it being used in newer js libraries that are written.

For more information have a look at these links:

## Thank you ##