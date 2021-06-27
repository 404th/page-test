let SERVER_URL = "https://article-api-404th.herokuapp.com";

document.getElementById("todo_add").addEventListener("click", () => {
    PostArticle();
});

// to delete an to do item
async function deleteTodo(id) {
    try {
        await fetch(`${SERVER_URL}/article/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                GetAllArticles(SERVER_URL);
                return res;
            })
            .catch((err) => {
                throw new Error(err);
            });
    } catch (err) {
        if (err) {
            throw new Error(err);
        }
    }
}

// to post to do
async function PostArticle() {
    let todo = {
        title: "",
        body: "",
    };

    todo.title = document.querySelector("#formGroupTodoItemTitle").value;
    todo.body = document.querySelector("#formGroupTodoItemBody").value;

    await fetch(`${SERVER_URL}/article/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    })
        .then((res) => res.json())
        .then((res) => {
            GetAllArticles(SERVER_URL);

            document.querySelector("#formGroupTodoItemTitle").innerText = "";
            document.querySelector("#formGroupTodoItemBody").innerText = "";
            document.getElementById("todo_add_close").click();

            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
}

async function GetAllArticles(url) {
    try {
        let arts = await fetch(`${url}/article`)
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });

        if (arts.errors.length !== 0) {
            throw new Error("Error occured!");
        } else {
            if (arts.data.value.length > 1) {
                makeTodoItem(arts.data.value.reverse().slice(0, 5));
            } else {
                makeTodoItem(arts.data.value);
            }
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
}

// todo item creator
function makeTodoItem(data) {
    let allTodo = "";
    for (let item of data) {
        let elem =
            `<div class="app_container_cover_second_articles_card_body_todo">
                        <div class="app_container_cover_second_articles_card_body_todo_cover">
                            <div 
                                class="app_container_cover_second_articles_card_body_todo_cover_btn" 
                            >
                                <svg
                                    class="bi bi-grip-vertical app_container_cover_second_articles_card_body_todo_cover_btn_svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                                    />
                                </svg>
                            </div>
                            <div class=" app_container_cover_second_articles_card_body_todo_cover_title truncate">` +
            item.title +
            `</div>
                            <div class="app_container_cover_second_articles_card_body_todo_cover_space"></div>
                            <div class="app_container_cover_second_articles_card_body_todo_cover_confirm">
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                                        />
                                    </svg>
                                </button>
                                <button onclick='deleteTodo("` +
            item._id +
            `")' >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-x"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>`;

        allTodo += elem;
    }
    let element = document.getElementById(
        "add_container_cover_second_articles"
    );
    element.innerHTML = allTodo.trim();
}

// To show to do list
GetAllArticles(SERVER_URL);

function aboutTodo() {
    console.log("Something");
}
