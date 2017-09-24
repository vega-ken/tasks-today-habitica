# Tasks-today-habitica
A node.js web app that works with the Habitica API. For now, it just supports habitica tasks.

![demonstration gif](https://i.imgur.com/vCmbmwm.gifv "demonstration gif")

I created this program as a way to practice and to use [Habitica](https://habitica.com/) as a more convenient task manager for me.
It uses the [Habitica API v3](https://habitica.com/apidoc/)  bootstrap grid system, 

##Getting Started

### Prerequisites

Having [Node.js](https://nodejs.org/) installed on your machine.
Having an [Habitica](https://habitica.com/) account.

### Installing

Before running the program, you need to change the archive app.js. 
In the first two lines, replace *your-api-user-id* and *your-api-token* with yours from your account.
You can get them [here](https://habitica.com/#/options/settings/api).

After you save your changes, open the terminal or command prompt in the path of the archives downloaded and type:

```
npm install
```

then

```
npm start
```

If everything is ok, go to your browser to http://localhost:3000 

After using the program, press Ctrl+C on the terminal to stop it.

## Troubleshooting

* Normal tasks are completed or checked double clicking them on the text.

* If npm start gives you an error, you could have some service actually listening at port 3000. Check if port 3000 is listening on your machine.

## Ideas for next versions

- [ ] Pass all this code to just HTML, CSS and JS.
- [ ] Enable daily tasks and habits also (those will be added to the navbar).
- [ ] Add notes to tasks with a character. Example: if you write "Task 1 | Note of task 1", the program should separate the two of them.
- [ ] Enable edit button or remove it.
- [ ] Enable the navigation button change the order of the tasks in the server.
- [ ] Add an indicator for the synchronization with Habitica' server.

### Additional

In the case you want it, you can run this program in your android phone thanks to [Termux](https://play.google.com/store/apps/details?id=com.termux&hl=es_419). Just take the same steps and don't forget to add your API credentials.

## Author

* [Ken Vega](http://www.kenvega.com)

## Acknowledgments

* Thanks to [Brad](https://www.youtube.com/user/TechGuyWeb) and [Shaun](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg). Their youtube channels have helped me a lot.