This Toto Microservice is a **reacting** to a Training Session events and managing the session exercises

When a new training session is created, this Microservice will create the exercises for that training session by either:
 * copying the exercises of the last workout that had the same exercises
 * copying the exercises from the plan in case it's the first time the plan is being executed in a workout session

When a session is deleted, this Microservice will delete the exercises from the session
