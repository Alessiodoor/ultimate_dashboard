import React from "react";

function Welcome() {
	return (
		<div>
			<section id="title">
				<div className="container-fluid title-section">
					<div className="row">
						<div className="col-lg-6">
						  <h1 className="big-heading">Welcome to the ultimate dashboard!</h1>
						</div>
						<div className="col-lg-6 image-div">
						  <img className="title-img" src="images/iphone6.png" alt="iphone-mockup" />
						</div>
					</div>
				</div>
			</section>
		</div>
		);
}

export default Welcome;