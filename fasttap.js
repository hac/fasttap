// This code is inspired by the Google Article "Creating Fast Buttons for Mobile Web Applications": http://code.google.com/mobile/articles/fast_buttons.html

// callAsync calls a function without disrupting the current thread, and sets the "this" variable to obj

Function.callAsyncFunction = new Array(); // Arrays allow us to deal with multiple functions at a time.
Function.callAsyncObj = new Array();
Function.prototype.callAsync = function(obj)
{
	Function.callAsyncFunction.push(this);
	Function.callAsyncObj.push(obj);
	setTimeout("Function.callAsyncFunction.pop().call(Function.callAsyncObj.pop())", 0);
}

// fasttap adds a listener to simulate an instant onclick with only touch events

HTMLElement.prototype.fasttap = function(callback, options)
{
    nullFunction = function () {};
    
    defaultOptions = { "propogate":true, "touchstart":nullFunction, "touchmove":nullFunction, "touchend":nullFunction };
    if (options != null)
    {
        for (k in options)
        {
            defaultOptions[k] = options[k];
        }
    }
    
	this.ft_touchstarted = false;
	this.ft_touchmoved = false;
	this.ft_callback = callback;
	this.ft_options = defaultOptions;
	
	this.addEventListener('touchstart', this.fasttap.touchstart);
	this.addEventListener('touchmove', this.fasttap.touchmove);
	this.addEventListener('touchend', this.fasttap.touchend);
}

HTMLElement.prototype.fasttap.touchstart = function(e)
{
	this.ft_touchstarted = true;
	this.ft_options.touchstart.callAsync(this);
	if (!this.ft_options.propogate) { e.stopPropagation(); }
}

HTMLElement.prototype.fasttap.touchmove = function(e)
{
	this.ft_touchmoved = true;
	this.ft_options.touchmove.callAsync(this);
	if (!this.ft_options.propogate) { e.stopPropagation(); }
}

HTMLElement.prototype.fasttap.touchend = function(e)
{
    this.ft_options.touchend.callAsync(this);
    
	if (this.ft_touchstarted && !this.ft_touchmoved)
	{
		this.ft_callback.callAsync(this);
	}

	this.ft_touchstarted = false;
	this.ft_touchmoved = false;
	
	if (!this.ft_options.propogate) { e.stopPropagation(); }
}