<script>
    import InputPromt from "../../components/input-promt.svelte";
</script>

<svelte:head>
    <title>Payment | Dasi-GPT</title>
</svelte:head>

<div class="paymentContent">
  <div class="paymentInfo">
    <form id="payment-form" class="paymentForm">
      <ion-icon class="paymentIcon" name="person-outline"></ion-icon>
      <div class="formTitle">
        <hr class="questionLine">
        <h3 style="font-size:13px;" class="regular">Fill Out This Form</h3>
        <hr class="questionLine">
      </div>

      <div class="paymentName">
        <InputPromt HideSvg={true} labelClass="noLabelAnimation" label="First Name" Width="10rem" external={false} onEnter={() => {}} />
        <InputPromt HideSvg={true} labelClass="noLabelAnimation" label="Last Name" Width="10rem" external={false} onEnter={() => {}} />
      </div>
      <InputPromt HideSvg={true} labelClass="noLabelAnimation" label="Email" Width="21rem" external={false} onEnter={() => {}} />
      <button type="button">Checkout</button>
  </div>
</div>

<style>
  .paymentIcon {
    display: flex;
    font-size: 80px;
    visibility: visible;
  }
  .formTitle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .questionLine {
    flex: 1;
    border: none;
    border-top: 1px solid #000; 
    margin: 0 1rem; 
    color: var(--secondary-text);
  }
  .paymentName {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .paymentContent {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, var(--accent), var(--primary-text));
  }

  .paymentInfo {
    border-radius: 16px;
    background-color: var(--background);
  }

  .paymentForm {
    padding: 3rem 2rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
</style>