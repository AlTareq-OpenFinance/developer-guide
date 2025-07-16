---
prev:
  text: 'UI Toolkit'
  link: '/developer-tools/ux-toolkit/'

next: false
---

# Integrating the New Dirham Symbol into Open Finance

With the CBUAE unveiling a new symbol for the UAE Dirham—designed for both physical and digital forms— Nebras is supporting the incorporation of the Dirham symbol into the UAE Open Finance standards. This alignment ensures consistency across financial platforms, reinforces national identity, and supports the broader goals of the UAE’s Financial Infrastructure Transformation (FIT) Programme.

As Open Finance evolves, adopting the Dirham symbol will help ensure readiness for the growing use of the Dirham and improve trust and usability for all participants.

[Official UAE Dirham Guidelines](https://drive.google.com/file/d/1-YL2cZBxKgjBZGF8ms_tzI9yhJBZLCuz/view?usp=sharing)

## Official UAE Dirham Symbol (vector)

<br/>
<img src="/images/dirham.svg" alr="dirham"/>
<br/>

## Example Use

<br/>
<img src="/images/demo/dirham-lfi.png" alr="dirham-lfi"/>
<br/>



<br/>
<img src="/images/demo/dirham-tpp2.png" alr="dirham-tpp2"/>
<br/>


<br/>
<img src="/images/demo/dirham-tpp.png" alr="dirham-tpp"/>
<br/>



## Integration Guidance | Until Unicode is assigned 

Since the Dirham symbol is not yet part of the Unicode standard, implementers can use the following code snippet to place the Dirham symbol within their application.

dirham-symbol.html

```html
<style>
  .icon-text {
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    font-family: sans-serif;
  }

  .icon-text svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
</style>

<div class="icon-text">
  <!-- Example: checkmark SVG -->
  <svg viewBox="0 0 131 114" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M130.254 54.8906L129.264 53.9766C127.664 52.4531 125.76 51.6914 123.703 51.6914H113.039C113.191 53.5195 113.268 55.3477 113.268 57.3281C113.268 59.3086 113.191 61.1367 113.039 63.041H120.275C125.76 63.041 130.254 68.2207 130.254 74.6953V77.5898L129.264 76.5996C127.664 75.1523 125.76 74.3906 123.703 74.3906H111.439C105.574 100.061 85.084 114 52.7871 114H11.3496C11.3496 114 16.9863 109.658 16.9863 95.1094V74.3906H10.0547C4.49414 74.3906 0 69.1348 0 62.7363V59.8418L1.06641 60.7559C2.58984 62.2031 4.49414 63.041 6.55078 63.041H16.9863V51.6914H10.0547C4.49414 51.6914 0 46.4355 0 40.0371V37.1426L1.06641 38.1328C2.58984 39.5801 4.49414 40.3418 6.55078 40.3418H16.9863V20.4609C16.9863 5.45508 11.3496 0.732422 11.3496 0.732422H52.7871C84.1699 0.732422 105.193 14.5195 111.363 40.3418H120.275C125.76 40.3418 130.254 45.5215 130.254 51.9961V54.8906ZM51.2637 6.36914H33.9727V40.3418H92.0918C88.1309 16.7285 74.6484 6.36914 51.2637 6.36914ZM93.4629 57.3281C93.4629 55.3477 93.3867 53.5195 93.3105 51.6914H33.9727V63.041H93.3105C93.3867 61.1367 93.4629 59.3086 93.4629 57.3281ZM33.9727 108.287H51.416C76.1719 107.678 88.3594 95.7949 92.0918 74.3906H33.9727V108.287Z" fill="black"/>
    </svg>
  <span>100.00</span>
</div>
```
