import urllib.request
import discord.utils
import discord
from discord.ext import commands
import urllib
import speech_recognition as sr
from datetime import datetime
import pyttsx3
import pytz
import urllib.request
import re
import youtube_dl
from cogs import music


class BasicFuntions(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print("Bot is ready!")

    @commands.command()
    async def listen(self, ctx):
        await self.tts(ctx, "Hey Discord is now listening!")
        quit = True
        discord = False
        while quit:
            try:
                phrase = await self.speech(ctx)
                if 'hey Discord' in phrase or discord:
                    if not discord:
                        await self.tts(ctx, "Yes?")
                    discord = True
                    if 'play' in phrase:
                        await self.ytsearch(ctx, phrase)
                    if 'pause' in phrase:
                        await music.Music.pause(self.client.get_cog("Music"), ctx)
                    if 'Q' in phrase:
                        await music.Music.queue(self.client.get_cog("Music"), ctx, phrase)
                    if 'resume' in phrase:
                        await music.Music.resume(self.client.get_cog("Music"), ctx)
                    if 'skip' in phrase:
                        await music.Music.stop(self.client.get_cog("Music"), ctx)
                    if 'time' in phrase:
                        await self.time(ctx)
                    if 'help' in phrase:
                        await music.Music.helpMusic(self.client.get_cog("Music"), ctx)
                    if 'quit' in phrase:
                        await self.tts(ctx, "shutting down")
                        quit = False
            except:
                pass

    @commands.command()
    async def speech(self, ctx):
        listener = sr.Recognizer()
        try:
            with sr.Microphone() as source:
                print("listening")
                voice = listener.listen(source)
                command = listener.recognize_google(voice)
                await ctx.send(command)
                return command
        except:
            pass

    @commands.command()
    async def time(self, ctx):
        tz_NY = pytz.timezone('America/Los_Angeles')
        datetime_NY = datetime.now(tz_NY)
        print(datetime_NY.strftime("%I:%M %p"))
        await self.tts(ctx, datetime_NY.strftime("%I:%M %p"))

    @commands.command()
    async def ytsearch(self, ctx, song_name):
        await self.tts(ctx, "searching for " + song_name)
        song_name = song_name[5:]
        search_keyword = song_name.replace(" ", "")
        html = urllib.request.urlopen("https://www.youtube.com/results?search_query=" + search_keyword)
        video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
        print("https://www.youtube.com/watch?v=" + video_ids[0])
        url = "https://www.youtube.com/watch?v=" + video_ids[0]
        await self.downloader(ctx, url, song_name)
        await music.Music.play(self.client.get_cog("Music"), ctx)

    @commands.command()
    async def tts(self, ctx, string):
        engine = pyttsx3.init()
        engine.say(string)
        engine.runAndWait()

    @commands.command()
    async def downloader(self, ctx, url, song_name):
        ydl_opts = {
            'format': 'bestaudio/best',
            # 'quiet': True,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            print("Downloading audio now\n")
            ydl.download([url])

    @commands.command()
    async def helps(self, ctx):
        embed = discord.Embed(
            title="Hey Discord Command List",
        )
        embed.add_field(name=":musical_note: Music", value="`.helpMusic`", inline=True)
        embed.add_field(name=":tools: Utility", value="`.helpUtility`", inline=True)
        await ctx.send(embed=embed)

    @commands.command(aliases=['helputility'])
    async def helpUtility(self, ctx):
        embed = discord.Embed(
            title=":tools: Utility Commands",
            description="`ping`,`8ball`",
            colour=discord.Colour.greyple()
        )
        await ctx.send(embed=embed)


def setup(client):
    client.add_cog(BasicFuntions(client))
