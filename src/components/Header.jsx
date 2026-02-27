import "../styles/global.css";

export default function Header() {
  return (
    <header class="fixed bg-main-blue w-full p-3 z-50">
      <div class="m-auto max-w-10/12 lg:max-w-5xl">
        <a href="/" class="">
          <h1 class=" text-3xl color-text-main font-(family-name:--title-text)">にゃずろぐ</h1>
        </a>
      </div>
    </header>
  )
}
