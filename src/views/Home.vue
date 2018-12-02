<template>
    <section>
        <div class="container">
            <div class="home">
                <h1 class="title">おとくなけいじばん</h1>
                <article class="comment" v-for="(article,index) in articles">
                    <div class="header">
                        <span>{{ index + 1 }}</span>:
                        <span>{{ article.title }}</span>:
                        <span>{{ article.createdAt }}</span>
                    </div>
                    <div class="body">{{ article.article }}</div>
                </article>

                <div class="form">
                    <div class="header">
                        <span class="label">名前:</span><input class="name" v-model="name">
                    </div>
                    <div class="body">
                        <textarea v-model="comment"></textarea>
                    </div>
                    <div>
                        <button v-on:click="submitComment">書き込む</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
</style>

<style lang="css">
.title {
    padding: 5px;
}

.comment {
    padding: 10px;
    width: 350px;
    text-align: left;
    margin: auto;
}

.comment .header{
    padding: 5px;
}

.comment .body{
    padding: 5px 10px;
}

.form {
    width: 350px;
    margin: auto;
}

.form .header {
    padding: 10px 0px 10px 0px;
    width: 100%;
}

.form .label {
    text-align: center;
    width: 50px;
}

.form .name {
    width: 300px;
}

.form .body {
    width: 350px;
}

.form .body textarea {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Table from '@/components/Table.vue';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

class Article {
    readonly title: string;
    readonly article: string;
    readonly createdAt: string;

    constructor(title: string,article: string,createdAt: string){
        this.title = title;
        this.article = article;
        this.createdAt = createdAt;
    }

    getValue(): Object {
        return {
            title: this.title,
            article: this.article,
            created_at: this.createdAt,
        };
    }
}

@Component({
    components: {
        HelloWorld,
        Table,
    },
})

export default class Home extends Vue {
    private tableData = [ ["KEY","VALUE"]];
    private keys = [];
    private uuids = [];
    private articles:Article[] = [];

    private name = "";
    private comment = "";

    private async refreshList(): Promise<void> {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbyPKt_jj1wlSSl76iu8haNDSFS6b6FNki6FAlUaLsMQVW6iTcQ/exec?action=gets');
        if(response.status == 200 && response.data.status == "OK") {
            this.keys = response.data.keys;
            this.uuids = response.data.keys;
        }

        const newArticles = await Promise.all(
            this.uuids.map(
                async (uuid) => {
                    const response = await axios.get(
                        'https://script.google.com/macros/s/AKfycbyPKt_jj1wlSSl76iu8haNDSFS6b6FNki6FAlUaLsMQVW6iTcQ/exec',
                        {
                            params: {
                                action: "get",
                                key: uuid,
                            }
                        }
                    );
                    if(response.status == 200 && response.data.status == "OK") {
                        return this.parseArticle(response.data.value)
                    }
                }
            )
        );

        const nonNullArticles = newArticles.filter(x => typeof x != "undefined") as Article[];

        nonNullArticles.sort( (x:Article, y:Article) => {
            const a = new Date(x.createdAt);
            const b = new Date(y.createdAt);
            return a.getTime() - b.getTime();
        });
        this.articles = nonNullArticles;
    }

    private async mounted(): Promise<void> {
        await this.refreshList();
    }

    private parseArticle(json: string): Article{
        const obj = JSON.parse(json);
        return new Article(
            obj['title'],
            obj['article'],
            obj['created_at']
        );
    }

    private makeComment(name: string,comment: string): Article {
        const date = new Date();
        const createdAt = date.toLocaleString();
        const title = name || "Vue.jsのすごい名無しさん";

        return new Article(
            title,
            comment,
            createdAt
        );

    }

    private async submitComment(): Promise<void> {
        if(this.comment == ""){
            return ;
        }
        const response = await axios.get(
            'https://script.google.com/macros/s/AKfycbyPKt_jj1wlSSl76iu8haNDSFS6b6FNki6FAlUaLsMQVW6iTcQ/exec',
            {
                params: {
                    action: 'set',
                    key: uuidv4(),
                    value : this.makeComment(
                        this.name,
                        this.comment
                    ).getValue()
                }
            }
        );
        await this.refreshList();
        this.comment = "";
    }
}
</script>
