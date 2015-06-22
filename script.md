# Personal Intro #

Hello everyone, my name is Clark and I'm an Interface developer at ansarada.

I'm here to encourage you to learn a bit more about javascript.

So as everyone knows by now, ES6, the next version of javascript, is coming around the corner and its packed full of new and interesting features. I want to introduce you to a lesser talked about, but no less important, feature called Symbols.

# Symbols, what are they #

What are Symbols? So to explain what symbols are and why they're useful, I first have to bring you back to some basics.

## Property access ##
So, some real basics, in Javascript, you can make objects.

(next)

And you can assign values to these objects using keys.

(next)

And you can access values using that key

(next)

You can also access the value using a string and the square brackets notation

(next)

You can also store that string in a variable and access the value using the variable

## Object as keys ##

Now since you can use variables to access values, what would happen if you tried to use an something other than a string to store the value, like, an object.

(next)

So here I'm storing my weight using an object as key. And it seems to work fine.

(next)

So I'll use another object as a key and store my height and again it seems to work fine.

(next)

But wait... If i try to access my weight again and it now says i'm little heavier than i should be... whats going on?

## Whats actually happening ##

So whats happening is that when you use something other than a string as a key, the `toString` method is called on the object to create a string. By default `toString` returns bracket object object close bracket, so when you use different object as keys, they will all be converted to the same string, and override each other's values.

And it isn't immediately obvious that javascript does this. It doesn't throw an error, it just silently works.

# Symbols #
So Symbols are a new way to store values on an object using something other than a string. So here are some basics.

## Basic usage ##

You create a symbol by calling the global function "Symbol".

(next)

You can use the symbol as the key when you assign a value to an object.

(next)

You can access the values by using the symbol as well.

## Descriptor ##

They take an optional descriptor argument, which is used purely for labelling and debugging purposes.

## Unique ##

They are distinct and unique from each other, which means if you create two symbols with the same descriptor, they are still not considered equal.

## Symbols are a new primitive ##

They are a new primitive type in Javascript, on the same level as Number, String, and Boolean.

(next)

If you run typeof on a Symbol you'll get back the string 'symbol'.

(next)

It also means you can't attach properties to symbols, just like numbers and strings.

## Prevents access ##

And what makes them really useful is that they are not readily accessible without having access to the symbol. In this example I've created an object with 2 values, one attached via a string and one attached via a symbol. I'm then iterating through them using a for in loop, and logging the results to console. Only the value attached using the string would be logged out.

# Use cases #

So you're probably thinking now, what is the point of this? Why introduce something that looks so similiar to an existing feature that i know and use so well already?

I'll show you a couple of possible use cases:

## Attaching properties in a safe way ##

Because Symbols are unique and will not have collision problems like with strings would, you can use them to add values on objects in a safe way. For example, you can use a symbol to attach some data to a DOMElement, and be confident that it will not affect some library code that may be inadvertently using the same key as you do.

This is actually something similar to what jquery does when you use the `data` method. jQuery creates a key called an expando that is the character underscore, followed by the word jQuery, and then a long string of random numbers to reduce the chance of collision. It uses that key to store a number on the DOMElement, which maps back to some data stored on an internal cache. With ES6 Symbols, jQuery can do away with the expando idea, and instead can use symbols as a way to approach this problem

## Built in Symbols ##

The ES6 spec defines a couple of well known Symbols. These are Symbols that are accessible from the Symbol class and expose aspects of the javascript language that you can hook into. An example of a well known symbol is `Symbol.iterator`.

### Symbol.iterator ###

ES6 introduced the concept of the for...of... loop. It's very similar to the for...in... loop, except instead of looping through an object's keys, it loops through its values. Its useful as a replacement for doing loops with the for...in... loop and the developer using it can avoid needing to use the hasOwnProperty check when using the for...in... loop.

(next)

Whats really cool is that ES6 also exposes some built-in symbols that allow you to control this iteration behaviour.

So for example, I've defined a new generator for this array of things that only yields the value if it is a string. It will make the previous example only log the string values. I've attached the generator using the built in symbol only the array object.

This is a bit of a toy example, and its only for one of the built-in symbols, but I'm sure as we move ES7 and beyond comes out, more and more language features will be accessible via built in symbols

## Encapsulation without (ab)using closures ##

The most important usage of symbols i think, is that its a better way to do encapsulation.

Encapsulation is about provide a cleaner public interfaces to your classes and hiding implementation detail from people who use your code.

Javascript doesn't really have a clear concept of 'private' properties as in other languages, so to achieve encapulations, developers have resorted to using closures to close over a private variable. In this example, I'm creating a Television class and I've chosen to hide the `hasPower` variable. Any changes to that variable has to be done through the `powerButton` method.

And this works, but there are some problems with this approach.

(next)

- One, debugging is difficult with this code. As your classes become more bigger and your program more complex, its convenient to be able to see what's going on so when you're debugging. Using closures, if you were to set a breakpoint in code that uses this class, you can't examine what that hasPower variable currently contains.

(next)

- Two, the closed over properties are completely inaccessible, making mixin or inheritance patterns less flexible. So say you want to create a sub-class called 'Plasma TV' thats based off this class, the Plasma TV class that inherits from this class would not be able to access the hasPower property.

(next)

- Three, theres a small performance hit with creating closures. Hiding variables with closures work because a new closure is created for every instance of Television. So for each instance thats created, a new closure has to be created per function defined in the constructor. This makes it much harder for the Javascript engine to properly optimize your code.

## Encapsulation using Symbols ##

Using Symbols, we can create a much better way to do the previous example.

(next)

First you create a symbol for the property you want to hide.

(next)

Then, any time you want to access or set that property, you use the symbol as the key. Thats pretty much all there is to it.

This approach fixes all the problems with the previous example:

(next)

- Because Symbols are attached to a specific object, the debugging tools show you the symbols and values that are attached to an object when you log it to console, or mouse over it during debugging.

(next)

- If you create a subclass using this method, all you have to do is pass the symbol to the subclass to be able to access the hidden property.

(next)

- And because you're not using closures anymore, the Javascript engine can better optimize your code.

So clearly a better way to do encapsulation.

# Summary #

And thats it for symbols. They're a new language feature that helps you write cleaner code. I hope I've given you a good quick introduction to Symbols and what they are.

# Links #

You can find out more nitty gritty details about Symbols through these links. I'll tweet them out later.

## Thank you ##