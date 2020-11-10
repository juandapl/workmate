# Workmate
A Firefox/Chrome extension that assists the user in staying productive by blocking social media websites, allocating work/break timings, and prodding the user if they are inactive.

# Inspiration
In Zoom University, where your rest and work spaces are the same, it is very easy to get distracted. We noticed that in remote learning, we managed to finish way less work than we did with regular classes. This led us to think that although we spend the same time in front of our work, we actually use much less of it to actually work.

# How it was built
The extension connects to Chrome and Firefox's WebExtensions API using
-HTML/CSS
-JavaScript

The extension was built continuously in two places 18,943 kilometers and 13 timezones apart. This meant that Workmate had a team dedicated 24/7 to its development (mostly because one of the teammates would be asleep while the other one was working, but counts...). At night, Jun was plugging in content scripts, and in the morning, Juan was designing a brand that definitely didn't take 2 minutes in Paint. We achieved synergy between the backend and the frontend (ironically) because of our geographical distance.

# Challenges
- Establishing a workflow despite the timezone difference.
- Working in different dev machines simultaneously and achieving cross-browser compatibility. (Jun worked on Chrome, Juan worked on Firefox)
- Getting used to new languages and new features and getting comfortable with an external API on less than two days.

# What we learned
- Working together doesn't necessarily require us to be in the same place and the same timezone. We learned to trust that our teammate wouldn't break the extension while we slept.
- We learned to design a workflow where our work wouldn't overlap with each other, and where we could take advantage of the different skillsets of our team.
- We learned to conduct independent testing for each of the platforms we were working on, with each member working on the compatibility for the browser they were using (Firefox/Chrome)
- Reading your teammate's code (even if it resembles famous italian dishes), and getting directly into problem-solving is the best way to understand a new framework. Clear communication and keeping your teammate updated while keeping expectations clear saves a lot of time of trying to trace and understand new code.


# Installing
The extension is not yet published in the browsers' stores. Until then, you have to install it with a trick.

Chrome:
- download the code, and go to chrome://extensions 
- tick 'developer mode'
- click on 'load unpacked' and add the folder you just downloaded

Firefox
- download the code, and go to about:debugging
- click on 'this firefox' then on 'load temporary extension'
- navigate to the folder you just downloaded, and open 'manifest.json'





