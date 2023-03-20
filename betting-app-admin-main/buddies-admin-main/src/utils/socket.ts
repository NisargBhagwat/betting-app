import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function initializeSocket() {
    if (socket == null) {
        // socket = io("http://localhost:3000",
        //     { auth: { Authorization: "Bearer " + localStorage.getItem("jwt") } }
        // );

        socket = io("http://13.127.222.82:3000",
            { auth: { Authorization: "Bearer " + localStorage.getItem("jwt") } }
        );

        socket.on("connect_error", (err) => {
            console.log(err.message); // prints the message associated with the error
            toast.error("Something Went Wrong! Your Game Board is not Live!");
        });
    }
    return socket;
}

export default initializeSocket;


