$(
    () => {
        const socket = io()
        let login
        $("#form1").on("submit", () => {
            const msg = $("#msg").val()
            if(login){
                socket.emit("chat msg", msg)
                console.log("enviou msg", msg)
            }
            else {
                socket.emit("login", msg)
                login = msg
            }
            return false;
        })

        socket.on("chat msg", msg => $("#messages").append($("<li>").text(msg)))
    }

)