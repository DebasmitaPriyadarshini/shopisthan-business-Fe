import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNavigationDashboard = (props) => {
  const storeDetails = useSelector((state) => state.userStore.userStore);
  const [storeInfo, setStoreInfo] = useState(storeDetails);

  useEffect(() => {
    return setStoreInfo(storeDetails);
  }, [storeDetails]);

  if (props.show) {
    return null;
  }
  return (
    <>
      <div className="bottom-zero-for-navigation">
        <ul className="ul-for-dore-ul-lst-nav-li">
          <NavLink exact activeClassName="active" to="/storeDashboard">
            <div>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="backgound-for-active-whiye-dd">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    className="new-svg-for-profile-botom-use"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M243 5102 c-97 -34 -186 -122 -224 -222 -19 -50 -19 -77 -17 -628 l3
-577 34 -63 c41 -75 103 -135 179 -170 l57 -27 900 0 900 0 60 29 c76 38 143
105 181 181 l29 60 0 580 0 580 -27 57 c-35 76 -95 138 -170 179 l-63 34 -895
2 c-839 2 -898 1 -947 -15z"
                      />
                      <path
                        d="M3028 5106 c-102 -37 -182 -109 -227 -205 l-26 -56 0 -1220 0 -1220
29 -60 c38 -76 105 -143 181 -181 l60 -29 900 0 900 0 57 27 c76 35 138 95
179 170 l34 63 0 1230 0 1230 -27 55 c-35 71 -107 143 -178 178 l-55 27 -895
2 c-719 2 -902 0 -932 -11z"
                      />
                      <path
                        d="M263 2976 c-99 -32 -178 -99 -230 -198 l-28 -53 0 -1230 0 -1230 27
-55 c35 -71 107 -143 178 -178 l55 -27 910 0 910 0 63 34 c75 41 135 103 170
179 l27 57 0 1220 0 1220 -29 60 c-38 76 -105 143 -181 181 l-60 29 -885 2
c-712 1 -893 -1 -927 -11z"
                      />
                      <path
                        d="M3022 1690 c-74 -27 -140 -77 -185 -140 -69 -99 -68 -92 -65 -716 l3
-559 27 -57 c35 -76 95 -138 170 -179 l63 -34 910 0 910 0 55 27 c71 35 143
107 178 178 l27 55 0 590 0 590 -34 63 c-41 75 -103 135 -179 170 l-57 27
-885 2 c-851 2 -887 2 -938 -17z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="bottom-navigation-tags">Dashboard</p>
            </div>
          </NavLink>

          {storeInfo && storeInfo.productFeature ? (
            <NavLink exact activeClassName="active" to="/storeProduct">
              <div>
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="backgound-for-active-whiye-dd">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                      className="new-svg-for-profile-botom-use"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        stroke="none"
                      >
                        <path d="M2740 5025 l0 -95 185 0 185 0 0 95 0 95 -185 0 -185 0 0 -95z" />
                        <path
                          d="M2740 4430 l0 -329 -275 -551 -275 -550 0 -1500 0 -1500 370 0 370 0
0 878 0 878 185 325 185 324 0 187 0 186 31 26 c30 25 34 26 180 26 l149 0 0
85 0 85 -272 543 -273 542 -3 338 -3 337 -184 0 -185 0 0 -330z"
                        />
                        <path
                          d="M854 4196 c-145 -33 -266 -99 -368 -202 -76 -75 -123 -147 -163 -244
-44 -110 -53 -178 -53 -422 l0 -228 95 0 95 0 0 208 c0 141 5 229 15 275 58
273 328 468 594 430 42 -7 88 -16 104 -22 l27 -11 -44 -55 c-25 -30 -61 -87
-80 -127 -63 -132 -68 -167 -73 -445 l-5 -253 95 0 95 0 4 233 c4 183 9 244
22 287 25 77 69 157 116 210 l40 45 44 -49 c25 -27 58 -77 75 -111 51 -104 61
-166 61 -402 l0 -213 95 0 95 0 0 233 c0 196 -3 245 -20 314 -22 95 -69 193
-129 273 -22 30 -37 57 -33 61 15 14 79 29 141 35 125 11 284 -40 379 -122
l44 -37 64 64 c35 35 64 69 64 75 0 20 -109 101 -185 138 -115 56 -183 70
-330 70 -139 0 -194 -11 -307 -61 l-58 -26 -57 26 c-32 14 -83 33 -113 42 -75
23 -267 29 -346 11z"
                        />
                        <path
                          d="M170 2780 c55 -82 102 -150 105 -150 6 0 184 265 192 285 4 13 -24
15 -196 15 l-201 0 100 -150z"
                        />
                        <path
                          d="M730 1465 l0 -1465 645 0 645 0 0 1465 0 1465 -420 0 -420 0 0 -185
0 -185 -85 0 -85 0 0 185 0 185 -140 0 -140 0 0 -1465z"
                        />
                        <path
                          d="M0 1467 c0 -691 2 -1257 4 -1257 2 0 49 69 105 154 98 147 126 176
169 176 34 0 64 -33 165 -183 l102 -152 3 633 c1 349 1 915 0 1259 l-3 625
-110 -163 c-159 -236 -165 -236 -327 6 l-108 159 0 -1257z"
                        />
                        <path d="M3470 2560 l0 -100 645 0 645 0 0 100 0 100 -645 0 -645 0 0 -100z" />
                        <path
                          d="M3301 2061 c-72 -125 -131 -231 -131 -235 0 -3 284 -5 631 -4 l632 3
128 225 c71 124 129 228 129 233 0 4 -283 7 -629 7 l-630 0 -130 -229z"
                        />
                        <path
                          d="M4739 2018 c-57 -100 -105 -185 -107 -190 -2 -4 93 -8 212 -8 119 0
216 2 216 5 0 7 -211 375 -215 375 -1 0 -49 -82 -106 -182z"
                        />
                        <path d="M3100 825 l0 -825 645 0 645 0 0 825 0 825 -645 0 -645 0 0 -825z" />
                        <path d="M4570 825 l0 -825 275 0 275 0 0 825 0 825 -275 0 -275 0 0 -825z" />
                        <path
                          d="M171 150 l-102 -150 200 0 c111 0 201 2 201 5 0 6 -177 273 -190 288
-4 4 -53 -60 -109 -143z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="bottom-navigation-tags">Product</p>
              </div>
            </NavLink>
          ) : null}

          {storeInfo && storeInfo.orderFeature ? (
            <NavLink exact activeClassName="active" to="/storeOrder">
              <div>
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="backgound-for-active-whiye-dd">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="512.000000pt"
                      height="512.000000pt"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                      className="new-svg-for-profile-botom-use"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        stroke="none"
                      >
                        <path
                          d="M2406 5099 c-121 -42 -228 -135 -279 -244 l-27 -55 -197 0 c-221 0
-242 -6 -283 -72 -19 -31 -20 -51 -20 -408 0 -357 1 -377 20 -408 11 -18 34
-41 52 -52 32 -19 52 -20 888 -20 836 0 856 1 888 20 18 11 41 34 52 52 19 31
20 51 20 408 0 357 -1 377 -20 408 -41 66 -62 72 -283 72 l-197 0 -27 55 c-52
110 -159 203 -281 244 -84 29 -224 28 -306 0z"
                        />
                        <path
                          d="M847 4465 c-53 -20 -113 -66 -148 -113 -63 -86 -59 68 -59 -2113 l0
-1988 21 -56 c28 -74 100 -146 174 -174 56 -21 57 -21 1725 -21 1668 0 1669 0
1725 21 74 28 146 100 174 174 l21 56 0 1989 0 1989 -21 56 c-28 74 -100 146
-174 174 -49 19 -78 21 -249 21 l-194 0 -5 -277 c-3 -226 -8 -288 -22 -333
-48 -154 -174 -279 -330 -327 -56 -17 -113 -18 -925 -18 -811 0 -869 1 -925
18 -116 36 -218 115 -280 217 -62 102 -67 135 -72 443 l-5 277 -197 -1 c-142
0 -207 -4 -234 -14z m1631 -1295 c62 -38 92 -132 61 -193 -16 -31 -678 -695
-711 -713 -32 -17 -101 -18 -131 -3 -31 16 -376 359 -393 391 -34 65 -7 158
58 198 37 22 106 27 141 9 12 -6 75 -64 140 -127 l117 -117 278 276 c152 152
286 282 297 288 33 17 107 13 143 -9z m1272 -316 c107 -63 107 -205 0 -268
-34 -20 -50 -21 -390 -21 -340 0 -356 1 -390 21 -126 73 -99 250 43 285 17 4
183 7 367 6 318 -2 337 -3 370 -23z m-1272 -964 c62 -38 92 -132 61 -193 -16
-31 -678 -695 -711 -713 -32 -17 -101 -18 -131 -3 -31 16 -376 359 -393 391
-34 65 -7 158 58 198 37 22 106 27 141 9 12 -6 75 -64 140 -127 l117 -117 278
276 c152 152 286 282 297 288 33 17 107 13 143 -9z m1272 -316 c107 -63 107
-205 0 -268 -34 -20 -50 -21 -390 -21 -340 0 -356 1 -390 21 -126 73 -99 250
43 285 17 4 183 7 367 6 318 -2 337 -3 370 -23z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="bottom-navigation-tags">Order</p>
              </div>
            </NavLink>
          ) : null}
          {storeInfo && storeInfo.customerFeature ? (
            <NavLink exact activeClassName="active" to="/storeCoustomer">
              <div>
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="backgound-for-active-whiye-dd">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      className="new-svg-for-profile-botom-use"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        stroke="none"
                      >
                        <path
                          d="M1992 4620 c-18 -11 -41 -34 -52 -52 -20 -33 -20 -55 -20 -2008 0
-1953 0 -1975 20 -2008 11 -18 34 -41 52 -52 32 -19 52 -20 568 -20 516 0 536
1 568 20 18 11 41 34 52 52 20 33 20 55 20 2008 0 1953 0 1975 -20 2008 -11
18 -34 41 -52 52 -32 19 -52 20 -568 20 -516 0 -536 -1 -568 -20z"
                        />
                        <path
                          d="M3432 3660 c-18 -11 -41 -34 -52 -52 -20 -33 -20 -54 -20 -1528 0
-1474 0 -1495 20 -1528 11 -18 34 -41 52 -52 32 -19 52 -20 568 -20 516 0 536
1 568 20 18 11 41 34 52 52 20 33 20 54 20 1528 0 1474 0 1495 -20 1528 -11
18 -34 41 -52 52 -32 19 -52 20 -568 20 -516 0 -536 -1 -568 -20z"
                        />
                        <path
                          d="M552 3020 c-18 -11 -41 -34 -52 -52 -20 -32 -20 -53 -20 -1208 0
-1155 0 -1176 20 -1208 11 -18 34 -41 52 -52 32 -19 52 -20 568 -20 516 0 536
1 568 20 18 11 41 34 52 52 20 32 20 53 20 1208 0 1155 0 1176 -20 1208 -11
18 -34 41 -52 52 -32 19 -52 20 -568 20 -516 0 -536 -1 -568 -20z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="bottom-navigation-tags">Insights</p>
              </div>
            </NavLink>
          ) : null}

          <NavLink exact activeClassName="active" to="/storeProfile">
            <div>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="backgound-for-active-whiye-dd">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50.000000 50.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="new-svg-for-profile-botom-use"
                  >
                    <g
                      transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M143 459 c-88 -44 -127 -117 -121 -224 4 -85 33 -138 100 -182 62
-41 194 -41 256 0 23 15 54 46 69 69 25 37 28 50 28 128 0 78 -3 91 -28 128
-45 69 -97 96 -186 100 -62 2 -84 -1 -118 -19z m195 -28 c72 -37 112 -102 112
-181 0 -46 -27 -121 -47 -133 -15 -8 -93 32 -93 48 0 9 8 30 17 48 18 35 26
94 17 144 -9 58 -113 86 -165 44 -33 -26 -36 -117 -7 -183 11 -25 18 -53 15
-60 -3 -8 -23 -21 -46 -30 l-41 -16 -22 30 c-23 33 -34 107 -24 161 8 41 63
108 108 130 45 23 130 22 176 -2z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="bottom-navigation-tags">Settings</p>
            </div>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

const BottomNavigationProfile = (props) => {
  const storeUrl = props.store
    ? props.storeUrl.storeUrl
    : props.cart
    ? props.storeUrl
    : null;

  if (props.show) {
    return null;
  }
  return (
    <>
      <div className="bottom-navigation-for-user-profile-in-store-view">
        <ul className="ul-for-profile-user-nav-in-store-view">
          <NavLink
            exact
            activeClassName="active"
            to={{
              pathname: `/${storeUrl}`,
              state: { alreadyStoreDetails: props.cart ? true : false },
            }}
          >
            <div>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="backgound-for-active-whiye-dd">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    className="new-svg-for-store-view-icon"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M922 4569 c-38 -25 -847 -1149 -858 -1193 -5 -21 -12 -26 -35 -26
-24 0 -29 -4 -29 -25 0 -21 5 -25 29 -25 26 0 29 -4 35 -42 4 -24 27 -85 52
-136 86 -177 262 -311 452 -344 138 -23 307 30 439 140 57 48 66 52 113 52 47
0 56 -4 113 -52 132 -110 300 -163 439 -140 93 16 215 74 295 140 57 48 66 52
113 52 47 0 56 -4 113 -52 80 -66 202 -124 295 -140 139 -23 307 30 439 140
57 48 66 52 113 52 47 0 56 -4 113 -52 132 -110 300 -163 440 -140 92 16 214
74 294 140 57 48 66 52 113 52 47 0 56 -4 113 -52 132 -110 301 -163 440 -140
189 33 365 167 451 344 25 51 48 112 52 136 6 38 9 42 35 42 24 0 29 4 29 25
0 21 -5 25 -29 25 -23 0 -30 5 -35 26 -4 15 -191 284 -416 599 -286 400 -420
579 -443 594 l-34 21 -1604 0 -1604 0 -33 -21z"
                      />
                      <path
                        d="M1056 2433 c-98 -41 -205 -64 -331 -70 -108 -5 -301 8 -341 24 -12 5
-14 -109 -12 -813 l3 -819 23 -47 c30 -60 90 -120 150 -150 l47 -23 1278 -3
1277 -2 0 800 0 800 530 0 530 0 0 -801 0 -800 158 3 c140 3 162 5 204 26 60
30 120 90 150 150 l23 47 3 814 2 813 -27 -7 c-16 -3 -109 -9 -209 -12 -206
-6 -291 6 -432 62 l-82 33 -60 -25 c-145 -58 -200 -67 -420 -67 -220 0 -275 9
-420 67 l-60 25 -60 -25 c-145 -58 -200 -67 -420 -67 -220 0 -275 9 -420 67
l-60 25 -60 -25 c-123 -49 -206 -65 -375 -70 -184 -6 -292 8 -421 55 -43 16
-86 31 -94 34 -8 3 -41 -5 -74 -19z m1234 -833 l0 -530 -690 0 -690 0 0 530 0
530 690 0 690 0 0 -530z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="bottom-navigation-tag-for-prfoile-and-store-view">
                Store
              </p>
            </div>
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            to={{
              pathname: "/store-responsive-cart",
              state: { storeUrl: storeUrl },
            }}
          >
            <div>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="backgound-for-active-whiye-dd">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    className="new-svg-for-store-view-icon"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M2360 4945 c-355 -79 -629 -336 -731 -686 -16 -55 -22 -112 -26 -221
l-5 -148 -172 0 c-209 0 -279 -11 -375 -55 -131 -62 -232 -192 -260 -335 -6
-30 -40 -696 -77 -1479 -63 -1354 -65 -1427 -50 -1488 43 -174 160 -303 323
-353 64 -20 91 -20 1573 -20 1482 0 1509 0 1573 20 121 37 232 132 286 243 12
24 28 72 37 109 16 63 14 123 -50 1489 -37 783 -71 1449 -77 1479 -32 166
-154 303 -320 361 -56 20 -89 23 -275 27 l-212 4 -5 147 c-3 108 -10 165 -26
220 -96 328 -343 576 -672 672 -97 28 -359 36 -459 14z m295 -320 c212 -23
419 -192 500 -408 23 -63 44 -198 45 -289 l0 -38 -640 0 -640 0 0 38 c1 91 22
226 45 289 67 176 203 312 379 378 66 25 185 45 236 39 14 -2 48 -6 75 -9z
m1264 -1080 c40 -20 79 -70 86 -108 3 -18 35 -659 70 -1426 l65 -1394 -20 -43
c-13 -26 -36 -53 -58 -66 l-37 -23 -1465 0 -1465 0 -37 23 c-22 13 -45 40 -58
66 l-21 43 66 1404 c61 1300 68 1407 86 1446 21 44 56 72 104 84 16 4 621 7
1343 8 1135 1 1317 -1 1341 -14z"
                      />
                      <path
                        d="M1700 3208 c-62 -31 -94 -92 -86 -163 11 -95 78 -260 149 -365 45
-66 163 -186 232 -235 110 -78 248 -137 390 -166 83 -17 294 -14 380 5 362 80
640 341 736 691 32 119 8 194 -75 234 -54 26 -98 27 -152 1 -53 -26 -71 -53
-96 -143 -57 -207 -218 -380 -418 -448 -89 -30 -240 -37 -335 -15 -121 29
-209 79 -305 176 -92 92 -131 158 -169 287 -12 40 -34 86 -48 104 -52 61 -128
75 -203 37z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="bottom-navigation-tag-for-prfoile-and-store-view">
                Bag
              </p>
            </div>
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            to={{
              pathname: "/user-profile",
              state: { storeUrl: storeUrl },
            }}
          >
            <div>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="backgound-for-active-whiye-dd">
                  {/* <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    className="new-svg-for-store-view-icon"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M2332 5106 c-512 -97 -870 -449 -989 -971 -26 -114 -26 -444 0 -564
62 -286 194 -531 387 -718 111 -107 181 -157 305 -218 191 -94 322 -125 525
-125 203 0 334 31 525 125 348 171 601 513 692 936 26 120 26 450 0 564 -58
257 -170 467 -336 633 -159 159 -336 257 -570 319 -82 22 -122 26 -281 29
-128 2 -207 -1 -258 -10z m471 -400 c428 -126 680 -551 603 -1014 -58 -344
-264 -622 -549 -740 -400 -167 -840 20 -1051 445 -190 384 -116 865 174 1126
110 99 261 174 407 202 119 22 304 14 416 -19z"
                      />
                      <path
                        d="M2320 2234 c-331 -28 -474 -48 -661 -95 -434 -108 -800 -316 -1036
-589 -258 -299 -401 -660 -442 -1120 -24 -259 -11 -339 65 -396 l37 -29 2277
0 2277 0 37 29 c76 57 89 137 65 396 -54 600 -285 1046 -702 1358 -307 230
-707 370 -1217 427 -127 15 -602 27 -700 19z m455 -384 c637 -35 1102 -208
1401 -522 191 -200 332 -519 369 -833 3 -27 8 -65 11 -82 l5 -33 -2001 0
-2001 0 5 33 c3 17 8 55 11 82 37 314 178 633 369 833 292 307 769 488 1373
521 214 12 258 12 458 1z"
                      />
                    </g>
                  </svg> */}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50.000000 50.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="new-svg-for-store-view-icon"
                  >
                    <g
                      transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M143 459 c-88 -44 -127 -117 -121 -224 4 -85 33 -138 100 -182 62
-41 194 -41 256 0 23 15 54 46 69 69 25 37 28 50 28 128 0 78 -3 91 -28 128
-45 69 -97 96 -186 100 -62 2 -84 -1 -118 -19z m195 -28 c72 -37 112 -102 112
-181 0 -46 -27 -121 -47 -133 -15 -8 -93 32 -93 48 0 9 8 30 17 48 18 35 26
94 17 144 -9 58 -113 86 -165 44 -33 -26 -36 -117 -7 -183 11 -25 18 -53 15
-60 -3 -8 -23 -21 -46 -30 l-41 -16 -22 30 c-23 33 -34 107 -24 161 8 41 63
108 108 130 45 23 130 22 176 -2z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="bottom-navigation-tag-for-prfoile-and-store-view">
                Profile
              </p>
            </div>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export { BottomNavigationProfile, BottomNavigationDashboard };
