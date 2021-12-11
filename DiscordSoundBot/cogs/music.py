import re
import urllib
import urllib.request
import discord
import shutil
import youtube_dl
import os
from discord.utils import get
from discord.ext import commands
from cogs import basicFunctions

queues = {}


class Music(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.command(pass_contex=True, aliases=['helpmusic'])
    async def helpMusic(self, ctx):
        embed = discord.Embed(
            title=":musical_note: Commands",
            description="`help`,`join`,`play`,`pause`,`time`,`resume`,`skip`,`queue`,`quit`",
            colour=discord.Colour.blue()
        )
        await ctx.send(embed=embed)

    @commands.command(pass_context=True)
    async def join(self, ctx):
        channel = ctx.author.voice.channel
        await channel.connect()
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicCommands"), ctx,
                                               "hey Discord has joined the call!")

    @commands.command(pass_context=True, aliases=['p', 'pla'])
    async def play(self, ctx):
        name = ""
        def check_queue():

            Queue_infile = os.path.isdir("./Queue")
            if Queue_infile is True:
                DIR = os.path.abspath(os.path.realpath("./Queue"))
                length = len(os.listdir(DIR))
                still_q = length - 1
                try:
                    first_file = os.listdir(DIR)[0]
                except:
                    print("No more queued song(s)\n")
                    queues.clear()
                    return
                main_location = os.path.dirname(os.path.realpath("./music.py"))
                song_path = os.path.abspath(os.path.realpath("Queue") + "\\" + first_file)
                if length != 0:
                    print("Song done, playing next queued\n")
                    print(f"Songs still in queue: {still_q}")
                    song_there = os.path.isfile("song.mp3")
                    if song_there:
                        os.remove("song.mp3")
                    shutil.move(song_path, main_location)
                    for file in os.listdir("./"):
                        if file.endswith(".mp3"):
                            os.rename(file, 'song.mp3')

                    voice.play(discord.FFmpegPCMAudio("song.mp3"), after=lambda e: check_queue())
                    voice.source = discord.PCMVolumeTransformer(voice.source)
                    voice.source.volume = 0.07

                else:
                    queues.clear()
                    return

            else:
                queues.clear()
                print("No songs were queued before the ending of the last song\n")

        song_there = os.path.isfile("song.mp3")
        try:
            if song_there:
                os.remove("song.mp3")
                queues.clear()
                print("Removed old song file")
        except PermissionError:
            print("Trying to delete song file, but it's being played")
            await ctx.send("ERROR: Music playing")
            return

        Queue_infile = os.path.isdir("./Queue")
        try:
            Queue_folder = "./Queue"
            if Queue_infile is True:
                print("Removed old Queue Folder")
                shutil.rmtree(Queue_folder)
        except:
            print("No old Queue folder")

        await ctx.send("Getting everything ready now")

        voice = get(self.client.voice_clients, guild=ctx.guild)

        for file in os.listdir("./"):
            if file.endswith(".mp3"):
                name = file
                print(f"Renamed File: {file}\n")
                os.rename(file, "song.mp3")
        voice.play(discord.FFmpegPCMAudio("song.mp3"), after=lambda e: check_queue())
        voice.source = discord.PCMVolumeTransformer(voice.source)
        voice.source.volume = 0.07

        nname = name.rsplit("-", 2)
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicCommands"), ctx, f"Playing: {nname[0]}")
        print("playing\n")

    @commands.command(pass_context=True, aliases=['pa', 'pau'])
    async def pause(self, ctx):
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicFunctions"), ctx, "Pausing the music!")
        voice = get(self.client.voice_clients, guild=ctx.guild)
        if voice and voice.is_playing():
            print("Music paused")
            voice.pause()
            await ctx.send("Music paused")
        else:
            print("Music not playing failed pause")
            await ctx.send("Music not playing failed pause")

    @commands.command(pass_context=True, aliases=['r', 'res'])
    async def resume(self, ctx):
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicFunctions"), ctx, "Resuming the music!")
        voice = get(self.client.voice_clients, guild=ctx.guild)
        if voice and voice.is_paused():
            print("Resumed music")
            voice.resume()
            await ctx.send("Resumed music")
        else:
            print("Music is not paused")
            await ctx.send("Music is not paused")

    @commands.command(pass_context=True, aliases=['s', 'sto', 'skip'])
    async def stop(self, ctx):
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicFunctions"), ctx, "Skiping the song!")
        voice = get(self.client.voice_clients, guild=ctx.guild)
        queues.clear()
        if voice and voice.is_playing():
            print("Music stopped")
            voice.stop()
            await ctx.send("Music stopped")
        else:
            print("No music playing failed to stop")
            await ctx.send("No music playing failed to stop")

    @commands.command(pass_context=True, aliases=['q', 'que'])
    async def queue(self, ctx, song_name):
        song_name = song_name[2:]
        Queue_infile = os.path.isdir("./Queue")
        if Queue_infile is False:
            os.mkdir("Queue")
        DIR = os.path.abspath(os.path.realpath("Queue"))
        q_num = len(os.listdir(DIR))
        q_num += 1
        add_queue = True
        while add_queue:
            if q_num in queues:
                q_num += 1
            else:
                add_queue = False
                queues[q_num] = q_num

        queue_path = os.path.abspath(os.path.realpath("Queue") + f"\song{q_num}.%(ext)s")

        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicFunctions"), ctx, "searching for " + song_name)
        search_keyword = song_name.replace(" ", "")
        html = urllib.request.urlopen("https://www.youtube.com/results?search_query=" + search_keyword)
        video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
        print("https://www.youtube.com/watch?v=" + video_ids[0])
        url = "https://www.youtube.com/watch?v=" + video_ids[0]

        ydl_opts = {
            'format': 'bestaudio/best',
            'quiet': False,
            'outtmpl': queue_path,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            print("Downloading audio now\n")
            ydl.download([url])
        await ctx.send("Adding song " + str(q_num) + " to the queue")

        print("Song added to queue\n")

    @commands.command(pass_contex=True)
    async def leave(self, ctx):
        await ctx.voice_client.disconnect()
        await basicFunctions.BasicFuntions.tts(self.client.get_cog("BasicCommands"), ctx,
                                               "hey Discord has left the call!")


def setup(client):
    client.add_cog(Music(client))
