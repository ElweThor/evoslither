## WHY: Exit Strategy and Continuous Evolution?

While running the bot, I realized that adopting the same performance reevaluation strategy typically used with GAs was suboptimal, if not counterproductive, in this case.

# Problems:

- 1. During the run, the bot displays its DNA values ​​(genes), but these do not change, since performance reevaluations only occur upon death. This isn't a problem with normal GAs: they almost always run on emulators that allow thousands of "generations" per second.  
In our case, however, the bot is more efficient the longer it remains alive. This automatically places a significant limit on the number of reevaluations, and nullifies any changes to parameters during its "life" (game), which, in fact, does not occur.

- 2. The worst-case scenario, which would be a rare extreme case if it were a traditional GA (e.g., Life), but which in our case is much more likely to happen, is that the bot stays alive for a very long time, accumulating a large amount of experience. However, at a certain point, either due to a crash or simply because the browser it's running in needs to be closed (the script doesn't run server-side), you risk completely losing this "treasure," rendering the entire game useless.

# To overcome these problems, I've come up with three strategies:

- 1. Milestone Evolution: every 1,000 points (configurable), during the game, the parameters are forced to be reevaluated, obviously considering that the bot isn't "dead." However, this doesn't create any problems for the reevaluation function, which, at least for now, doesn't consider the reason for the reevaluation itself (assuming death). In the future, when/if this reason matters, a "milestone" type reason can always be assigned. This feature ensures you never lose track of accumulated experience by more than the length of a single milestone.

- 2. Time-based Evolution: Every 10 minutes (configurable), during an ongoing game, a re-evaluation occurs. This provides double security: the re-evaluation occurs even if the bot isn't accumulating points. As with the "milestone," if you need to evaluate the reason, you can use "time-based" as a tag. Again, as with the "milestone," this feature ensures you never lose track of accumulated experience by more than the length of a single time interval.

- 3. Graceful Death: If you need to stop the bot to close the browser, this feature can force a "final" reevaluation (effectively killing the bot). This will also update the DNA gene values ​​in local storage, set the bot to not-enabled, and return control to the user, allowing them to close the browser (or perform any other operation while the bot is stopped) without losing any accumulated experience. In this case, the entire experience amount is recorded, just as happens when the bot dies.

The first two features (milestone and time-based) also allow you to view updated DNA values ​​while the bot is still running.