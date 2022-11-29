export default function Header() {
  return (
    <div className="hero py-4">
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center justify-content-between">
          <div className="col-lg-6 logo justify-content-center justify-content-lg-end">
            <div>
              <img src="/images/SVCClogo.png" alt="SVCC Logo" />
            </div>
            <h2>
              <a
                href="https://www.siliconvalley-codecamp.com/Event/2019"
                target="_blank"
              >
                Gregory Schoenberg's Code Camp 2023
              </a>
            </h2>
          </div>
          <div className="col-lg-6 date-meta text-center text-lg-start mt-3 mt-lg-0">
            <h5 className="text-uppercase">October 19-20, 2023</h5>
            <h6 className="text-uppercase">San Jose, California</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
