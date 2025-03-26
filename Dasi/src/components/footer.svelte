<script>
    import { links } from "$lib/links";
    import Newsletter from "./newsletter.svelte";
    let footerlinks = links;
</script>
<div class="footer">
    <div class="footerElements">
        <div class="newsletter">
            <Newsletter />
        </div>
        <div class="navigation">
            <h3>Navigation</h3>
            <ul>
                {#each footerlinks as link}
                    {#if link.name != "sunny-outline" && link.name != "moon-outline"}
                    <li><a href={link.href}>{link.name}</a></li>
                    {/if}
                {/each}
            </ul>
        </div>
        <div class="atribution">
            <h3>Atributions</h3>
            <ul>
                <li><a href="https://www.freepik.com/free-vector/love-chocolate-cookies-cartoon-icon-illustration_12681143.htm#fromView=keyword&page=1&position=0&uuid=a48de0bb-3c83-470e-a51f-f11d533dd566&query=Heart+Cookie">Image by catalyststuff on Freepik</a></li>
            </ul>
        </div>
        <div class="contact">
            <h3>Contact</h3>
            <ul>
                <li>HJEJHDJFJ</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .footer {
        background-color: var(--background);
        display: flex;
        height: 50vh;
        align-items: center;
    }

    .footerElements {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        align-items: flex-start;
    }
    li {
        list-style-type: none;
        color: var(--secondary-text);
    }

    h3 {
        color: var(--primary-text);
    }
    a {
        text-decoration: none;
        color: var(--secondary-text);
    }
    ul {
        line-height: 30px;
    }
</style>