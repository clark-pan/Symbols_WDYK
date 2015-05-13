# Personal Intro #

Good evening everyone, my name is Clark and I'm an Interface developer at ansarada.

This is my first time talking in front of such a large crowd, so please be gentle...

I'm here tonight to encourage everyone to write more modern Javascript.

# Agenda #

So as everyone knows by now, ES6 is pretty much usable today, as long as you're happy to go through a transpiler like Traceur or Babel and I think its about time that we all look towards what new features are coming to Javascript and how we can use them.

I want to introduce everyone to a lesser talked about, but no less important feature, Symbols and I will show you how using symbols can make your code more readable, more debuggable, and possibly even run faster.

# Symbols, what are they #

What are Symbols? They're a new way to store values against an object and they look like this:

## Basic usage ##

The first line of code creates the Symbol. You create a symbol by calling the function "Symbol". The function accepts an optional string argument that describes the symbol. I've used the string "name" here because its going to store a person's name.

(next)

This next block of code shows how you would assign values to an object using the symbol as a key. The syntax is identical to how you would normally use strings as property keys.

(next)

You can access the values by using the symbol as well.

And thats... pretty much all symbols are.

So you're probably thinking now, what is the point of this? Why introduce something that looks so similiar to an existing feature that i know and use so well already?

Well, I'll show you use case.

## Encapsulation without (ab)using closures ##

So one way you can write cleaner code in any language is using encapsulation. By hiding methods and properties that are only used internally, and only exposing the methods and properties that the developer should be using, your code becomes much easier to understand and consume, and maintain.

Now, Javascript doesn't really have a clear concept of 'private' properties as other languages, which means developers have resorted to using various hacky methods, such as closures like so:

(next)

In this example, I've chosen to hide the `hasPower` variable inside the Television closure. If you know a bit about how closures behave in Javascript, it means that only the turnOn and switchChannel functions have access to the hasPower variable, and nothing else can mess with it. This way I can be sure that certain things have happen before the Television's power can be turned on.

So, this approach works, but there are several problems with this approach.

(next)

- One, debugging is difficult with this code. You can see here that if you console log an instance of this class, you can't see what the value hasPower variable is. As your classes become more bigger and your program more complex, its convenient and faster to be able to see what's going on so when you're debugging.

(next)

- Two, the hasPower variable is now completely inaccessible, which was your original purpose to begin with, but it makes mixin or inheritance code reuse patterns less flexible. So say you want to create a sub-class called 'Plasma TV' thats based off this class, that class will not be able to access or use the hasPower variable.

(next)

- Three, with this technique, you are actually creating two new functions everytime you make a new Television. This has performance implications in modern javascript environments and should be avoided in performance critical code paths.

# Encapsulation with symbols #

So next I'll show you how you can use Symbols to clean up this code a little.

(next)

Same as before, we'll be making a television.

(next)

First you create a symbol. Name it accordingly to describe the value.

(next)

Next, use that symbol when you want to get or set that property on the object.

(next)

Then, define your functions on the class prototype, and use symbols to access that property.

With this approach, all the problems with the closures example are fixed.

(next)

- When you log the instance in the debugger, you'll see what hasPower is.

(next)

- You can share symbols between classes, and they'll be able to access those properties. You may be wondering whats stopping other developers from doing this in outside code? Nothing technically... Well it should be a code-smell when they use a symbol like that, but I fully expect in the next few months that somebody will come up with a framework of some sort to manage symbols.

(next)

- Because you're only declaring your functions once on the prototype, they are only created once, which allows modern javascript engines to more efficiently optimize this code.

# Summary #

And thats it. I hope I've given you a good quick introduction to Symbols and I hope you can start to see some use for it to improve your own code. I'm pretty certain even if you don't, the next frameworks written with ES6 will be heavily employing this.

If you want more in-depth information about Symbols and other ES6 properties, have a look at these links:

## Thank you ##