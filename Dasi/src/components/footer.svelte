<script>
    import { links } from "$lib/links";
    import Newsletter from "./newsletter.svelte";
    let footerlinks = links;

    let twitterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"/></svg>`;
    let facebookSvg = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224c0,111.8,81.9,204.47,189,221.29V322.12H164.11V257.35H221V208c0-56.13,33.45-87.16,84.61-87.16,24.51,0,50.15,4.38,50.15,4.38v55.13H327.5c-27.81,0-36.51,17.26-36.51,35v42h62.12l-9.92,64.77H291V478.66C398.1,461.85,480,369.18,480,257.35Z" fill-rule="evenodd"/></svg>`;
    let instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"/><path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"/><path d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"/></svg>`;
    let linkedInSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"/></svg>`;
</script>
<div class="footer">
    <div class="footerElements">
        <div class="newsletter">
            <h3>Newsletter</h3>
            <div class="line"></div>
            <Newsletter />
        </div>
        <div class="navigation">
            <h3>Navigation</h3>
            <div class="line"></div>
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
            <div class="line"></div>
            <ul>
                <li><a href="https://www.freepik.com/free-vector/love-chocolate-cookies-cartoon-icon-illustration_12681143.htm#fromView=keyword&page=1&position=0&uuid=a48de0bb-3c83-470e-a51f-f11d533dd566&query=Heart+Cookie">Image by catalyststuff on Freepik</a></li>
            </ul>
        </div>
        <div class="contact">
            <h3>Contact</h3>
            <div class="line"></div>
            <div class="numberAndMail">
                <ul>
                    <li><a href="mailto:contact@dasigpt.com">Mail: contact@dasigpt.com</a></li>
                </ul>
            </div>
            <div class="social-links">
            <div class="socialLinks">
              <a href="/"><i class="socialIcon fa-facebook-f">{@html facebookSvg}</i></a>
              <a href="/"><i class="socialIcon fa-twitter">{@html twitterSvg}</i></a>
              <a href="/"><i class="socialIcon fa-instagram">{@html instagramSvg}</i></a>
              <a href="https://www.linkedin.com/company/danielogsimen/?viewAsMember=true"><i class="socialIcon fa-linkedIn">{@html linkedInSvg}</i></a>
            </div>
        </div>
    </div>
</div>
</div>

<style>
    .numberAndMail {
        margin-bottom: 0.5rem;
    }

    .socialIcon {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    :global(.socialIcon svg) {
        height: 17px;
        width: 17px;
        fill: #fff;
    }
    .socialLinks a {
        display: inline-block;
        height: 40px;
        width: 40px;
        background-color: var(--accent);
        margin: 0 10px 10px 0;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        color: #ffffff;
        transition: all 0.5s ease;
    }
    .social-links a:nth-child(1):hover {
        background-color: #316ff6; /* Facebook blue color */
    }

    .social-links a:nth-child(2):hover {
        background-color: #008ad8; /* Twitter blue color */
    }

    .social-links a:nth-child(3):hover {
        background-image: radial-gradient(
            circle at 30% 107%,
            #fdf497 0%,
            #fdf497 5%,
            #fd5949 45%,
            #d6249f 60%,
            #285aeb 90%
        ); /* Instagram gradient color */
    }

    .social-links a:nth-child(4):hover {
        background-color: #0077b5; /* LinkedIn blue color */
    }
    .line {
        width: 50px;
        height: 2px;
        background-color: var(--accent);margin-bottom: 0.5rem;
    }
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

    @media (max-width: 1010px) {
    .footerElements {
        display: flex;
        flex-direction: column; /* Stack items vertically */
        align-items: center; /* Center the items horizontally */
        gap: 1rem; /* Add spacing between items */
    }

    .footerElements > * {
        text-align: left; /* Ensure text starts at the same place */
        width: 100%; /* Make sure the items stretch to align text properly */
        max-width: 300px; /* Optional: Limit the width of each item */
    }
}
</style>