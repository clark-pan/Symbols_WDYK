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

Now since you can use variables to access values, what would happen if you tried to use something other than a string to store the value, like, an object.

(next)

So here I'm storing my weight using an object as key. And it seems to work fine.

(next)

So I'll use another object as a key and store my height and again it seems to work fine.

(next)

But wait... If i try to access my weight again and it now says i'm little heavier than i should be... whats going on?

## Whats actually happening ##

So whats happening is that when you use something other than a string as a key, the `toString` method is called on the object to create a string. By default `toString` returns bracket object object close bracket, so when you use different object as keys, they will all be converted to the same string, and override each other's values.

(next)

And even though the two objects are not equal,

(next)

they both become the same string value when used as a key.

It isn't really immediately obvious that you cannot do this, cause, I mean, it doesn't throw an error, and if you don't look too closely it just seems to work. Especially since, until ES6, we didn't really have a dictionary implementation, meaning people coming from other languages get confused when they can't seem to associate one object to another.

# Symbols #
So Symbols are a new way to store values on an object using something other than a string. So here are some basics.

## Basic usage ##

You create a symbol by calling the global function "Symbol".

(next)

You can use the symbol as the key when you assign a value to an object.

(next)

You can access the values by using the symbol as well.

## Descriptor ##

The symbol function take an optional descriptor argument, which is used purely for labelling and debugging purposes.

## Unique ##

They are distinct and unique from each other, which means if you create two symbols with the same descriptor, they are still not considered equal.

## Symbols are a new primitive ##

They are a new primitive type in Javascript, on the same level as Number, String, and Boolean.

(next)

If you run typeof on a Symbol you'll get back the string 'symbol'.

(next)

It also means you can't attach properties to symbols, just like numbers and strings.

## Protects access ##

And what makes them really useful is that they are not readily accessible without having access to the symbol. In this example I've created an object with 2 values, one attached via a string and one attached via a symbol. And as you can see you can't access the value using anything other than the symbol as the key. Even if you iterated through the keys of the object using a for...in... loop, you still wouldn't get access to the value. In this example only the name value would be logged to console.

## Doesn't completely stop all access ##

Its worth noting that while it makes it harder for developers to get access, it doesn't completely prevent it. ES6 also defines a new method called `getOwnPropertySymbols` that gets all the symbols of an object. This does mean that you can't completely stop access to a value using symbols, but I think the usage of getOwnPropertySymbols in anything other than debugging should be a code-smell.

# Use cases #

So you're probably thinking now, what is the point of this? Why introduce something that looks so similiar to an existing feature that i know and use so well already?

I'll show you a couple of possible use cases:

## No risk of collision ##

So say you want to create a component of some sort, maybe a dropdown or something. And of course you'll want to perhaps track some internal state of the component, maybe whether or not its open or closed. You could do that via say, a class, or maybe an attribute but that then forms part of the public api of your component. You could also do this via a property on the DOMElement that represents the dropdown. But then of course opens a whole can of worms about what to name the key for the property. Make it too simple and you may collide with something that a future dom spec will implement, make it too complex and it will become a pain to write.

If you've ever used the `data` method of jQuery, this is effectively what you've been doing. jQuery creates a long random string value called an expando and uses that to store another key against the element that then maps to a cache that stores the actual value you want to use.

Symbols are a great solution to this problem, since they are unique and there are no chance of a collision. You just create a key of your choosing and use that.

## Built in Symbols ##

ES6 also defines a couple of built-in symbols. They are used to give developers control to newer language features and how they function.

### Symbol.iterator ###

For example, ES6 defines a new way to loop through an object or array through the for...of... loop. It's very similar to the for...in... loop, except instead of looping through an object's keys, it loops through its values. Its useful as a replacement for doing loops with the for...in... loop and the developer using it can avoid needing to use the hasOwnProperty check when using the for...in... loop.

(next)

Whats really cool is that ES6 exposes a symbol that allows you to define a generator function to control this behaviour.

(next)

So for example, I've defined a new generator for this array of things that only yields the value if it is a string.

(next)

This means that now the for... of... loop will only log out the string values, apple, banana, pear

There are other built in symbols that control previously uncontrollable javascript behaviour such as Symbol.hasInstance which controls what the instanceof operator does. I suspect there'll be more features that will be exposed like this in the future, when it makes sense to give developers that control.

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

# Browser Support #

Browser support for symbols are very good. Chrome and Opera, Firefox and IE Edge support them out of the box without any flags. Safari currently doesn't support it but its in webkit's javascript engine. You can use Symbols in NodeJS behind the harmony flag or without any flags with IO.js

# Summary #

And thats it for symbols. They're a new language feature that helps you write cleaner code. I hope I've given you a good quick introduction to Symbols and what they are.

# Links #

You can find out more nitty gritty details about Symbols through these links. I'll tweet them out later.

## Thank you ##