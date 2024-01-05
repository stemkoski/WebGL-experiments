class Input
{
	constructor()
	{
		this.keyDownQueue = new Set();
		this.keyUpQueue   = new Set();
		this.pressingSet = new Set();
		this.pressedSet = new Set();
		this.releasedSet = new Set();

		let self = this;

		function onKeyDown(eventData)
		{
			// note: 
			// eventData.key = "a", "A", "3", "#", " ", "ArrowLeft"
			// eventData.code = "KeyA", "Digit3", "Space", "ArrowLeft"
			self.keyDownQueue.add( eventData.key );
		}
		document.addEventListener("keydown", onKeyDown);

		function onKeyUp(eventData)
		{
			self.keyUpQueue.add( eventData.key );
		}
		document.addEventListener("keyup", onKeyUp);
	}

	update()
	{
		// convert queues to arrays, and clear
		let keyDownArray = Array.from(this.keyDownQueue);
		let keyUpArray   = Array.from(this.keyUpQueue);
		this.keyDownQueue.clear();
		this.keyUpQueue.clear();		

		// also clear discrete events
		this.pressedSet.clear();
		this.releasedSet.clear();
		
		for (let k of keyDownArray)
		{
			k = k.toUpperCase();
			// avoid repeated key down events
			if (this.pressingSet.has(k))
				continue;
			else 
			{
 				this.pressingSet.add( k );
 				this.pressedSet.add( k );
			}
		}

		for (let k of keyUpArray)
		{
			k = k.toUpperCase();
			this.pressingSet.delete( k );
			this.releasedSet.add( k );
		}

	}

	pressedKey( k )
	{
		k = k.toUpperCase();
		return this.pressedSet.has(k);
	}	

	releasedKey( k )
	{
		k = k.toUpperCase();
		return this.releasedSet.has(k);
	}

	pressingKey( k )
	{
		k = k.toUpperCase();
		return this.pressingSet.has(k);
	}

	// check if any input states have changed since previous update
	//  only true during update following a key down or key up event
	stateChange()
	{
		return (this.pressedSet.size + this.releasedSet.size) > 0;
	}
}
