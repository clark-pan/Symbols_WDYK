# Personal Intro #

Good evening everyone, my name is Clark and I'm an Interface developer at ansarada.

This is my first time talking in front of such a large crowd, so please be gentle...

I'm here tonight to encourage everyone to write more modern Javascript.

# Agenda #

So as everyone may have heard, ECMAScript6, the next version of javascript, is coming around the corner. Its packed full of new and interesting features and i want to introduce you to a lesser talked about, but no less important, feature called Symbols. Along the way i hope to expand your knowledge of javascript a little as well.

# Symbols, what are they #

What are Symbols? So to explain what symbols are and why they're useful, I first have to bring you back to some basics.

## Property access ##
So, some real basics, in Javascript, you can make objects.

(next)

And you can assign values to these objects.

(next)

And there are various ways you can access those values on that object. You can use the dot notation, you can use the square bracket string notation with a string value, or you can assign that string to a variable and use the variable.

## Object as keys ##
Since you can use variables to access values, what would happen if you tried to use an object to access the value?

(next)

So you make your object... you create another object you want to use as a key... you assign the value... and Voila! it works

(next)

And now you think, well thats great, now i'm going to add another object as a key... and you try that out... Yep... still works... Until...

(next)

You look at the foo value again, and see that its changed its value. Whats going on?

## Whats actually happening ##

The javascript language, only ever accepts strings as keys, so my whole example before was a trick. It only works because, when Javascript sees you trying to set a property with an object, it calls that objects' 'toString' method to turn it into a string, which in this case returns open bracket, object Object, close bracket.

So it then uses that string to assign the value. When we used the second object as the key, it does the exact same thing to that object, which returns that same open bracket, object Object and sets the value with that, effectively overriding the property.

This is a part of the language that sometimes trips people up, because sometimes you want to say, put a property thats associated with an object, but doesn't make sense to be part of the object itself. You can't really do that in Javascript, so people usually resort to creating a unique string of some sort and use that instead, which brings along its own host of problems like, what is unique, and is it unique enough?

# Symbols #

Symbols are a solution to this problem. Symbols are a new javascript feature that allows you to assign a value to an object using symbols. They're unique, meaning if you don't have access to a symbol, its extremely difficult from code to access those values, making it impossible to have collisions when you have many keys.

I'll be showing you the very basics of how to use symbols.

## Basic usage ##

You create a symbol by calling the newly declared global function "Symbol". The function accepts an optional string argument that describes the symbol. You should use a string here that quickly describes what this Symbol is for. I've used the string "name" here because its going to store a person's name.

(next)

This next block of code shows how you would assign values to an object using the symbol as a key. The syntax is identical to how you would normally use strings as property keys.

(next)

You can access the values by using the symbol as well.

And thats... pretty much all symbols are.

# Summary #

I hope I've given you a good quick introduction to Symbols and what they are. There's way more you can do with symbols than i can go through with you in these 5 minutes so i suggest that you read up on these links to learn more about them. I'll tweet out the link to the slides later on.

## Thank you ##