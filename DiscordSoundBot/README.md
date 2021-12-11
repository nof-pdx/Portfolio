# Hey Discord
A personal assistant for Discord created by Noah Funderburgh 

Contributors: 

Noah Funderburgh [nof2@pdx.edu]

## The Project Purpose
---
In a manner similar to "Hey Google" or "Alexa …" we introduce the concept of a Discord personal assistant.
This personal assistant will be able to play, pause, queue, and skip music.
The music will be provided by the youtube API.

## Intended Functionality
---
The point of this program is to provide a Discord Bot that utilizes the Speech Recognition open source library to manage music. 
After configuring and starting the Discord bot, the user is be able to say commands like 
"Hey Discord, Play 'Sad'"
"Hey Discord, Pause."
[![IMAGE ALT TEXT](Thumbnail in imagur)](Youtube Video Link "Video Title")

### Available Commands:
How to use Commands https://media.pdx.edu/media/t/1_5hxpmv9m

*help* : Provides a chat message with what commands are available for you to use.

*play 'song name'*: Plays [song name]. Finds the song from Youtube.

*queue 'song name'*: Queues [song name] to play after the next queued song (after the next song if there is no songs in the queue). 

*pause*: Pauses the current playing song.

*resume*: Unpauses the current playing song.

*time*: Provides the current time.

*skip*: Proceeds to the next played song.

*quit*: Leaves the voice channel

## Installation
---
1. Clone the repo. Run `pip3 install -r requirements.txt`, preferrably in a Virtual Environment. *Note: Some linux users may also need to install libffi-devel*
2. Copy and paste the token in token.txt ( We sent it in the submition text box).
3. The machine you're using running this on requires `ffmpeg`. If you do not have ffmpeg, check out this Youtube tutorial for [windows](https://www.youtube.com/watch?v=r1AtmY-RMyQ), or you can use `brew install ffmpeg` if you have Homebrew. Proceed once you can successfully run `ffmpeg` in the command prompt.
4. The bot requires an active Discord voice channel, as well as an account to run. If you don't have one, create an account at https://discord.com/brand-new
5. Then, connect to the [server](https://discord.gg/dCrRfbAZ6E ) provided by copying and pasting this link, and clicking 'Accept': https://discord.gg/dCrRfbAZ6E 
6. After joining the Discord link, join the voice channel by clicking on the #general voice chat (has the audio icon to the left of it).
7. Start the bot by running `python3 main.py`. 
8. In the #bot text channel, type .join so that the bot joins the voice channel with you, then type .listen to begin the 'listening' process.
9. Execute commands by beginning with "Hey Discord", followed by what command you're hoping for. Check above for available functionality.
10. The bot will exit after a few minutes of inactivity or if you say "Hey Discord, leave."

## Results
---
### What worked? What didn't? 
Our initial project proposal involved using CMU Sphinx to detect the speech and translate it into 'commands'. We were planning on having CMU Sphinx launch, write these commands into the bot, and have the bot execute them. Shortly after, we ran into problems where CMU Sphinx had incredibly low accuracy and performed incredibly slow. The goal was unrealistic with how botched the microphone was, and creating a small dictionary of vocabulary didn't help make it any quicker. 

After diving a little into the rabbit hole, we decided to pivot towards the open source Speech Recognition library. We compared the models available to use and unsurpisingly, Google's model was incredibly accurate and provided the functionality at the speed that we were hoping to get.

It was once we had our Speech Recognition working that we realized Discord's API is very inconsistent with supporting audio. While some versions have great support, all of it is technically 'unofficial' and especially less supported on the Python interface. It wasn't in a stable version we could really use for this project, filled with bugs and disconnects. Instead, we decided to switch the bot to run locally. Rather than listening to the 'Discord' itself, it will listen to the microphone of the user that is speaking. 

In the end, we turned out very satisfied with the project. Depsite not being as reliable or consistent, that's just the state of the sound recognition. 

### Future Advancements
In the future, we'd love to use Discord directly through its API so that more people could make use of the bot. We'd also like to have a more reliable interface, including more user-friendliness (something like Siri beeping when it hears you).
