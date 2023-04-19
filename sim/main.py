import math


SIGMA_VALUE = 0.682689492137
THREE_SIGMA_VALUE = 0.997300203937

DELTA = 45
# BIAS = 0.52763
TIME = 86400

# RECOVERY_TIME = 10000
# BIAS = 1.0 - math.exp((-1.0 * DELTA)/(RECOVERY_TIME/5.0))

CUTOFF_PERIOD = 10.0 ** (math.log10(17473.707) - 0.6)
BIAS = 1.0 - math.exp((-1.0 * DELTA)/(CUTOFF_PERIOD/(2.0*math.pi)))

# SIGMA_TIME = 90
# BIAS = 1.0 - math.exp((-1.0 * DELTA)/((-1.0*SIGMA_TIME)/math.log(1.0-SIGMA_VALUE)))

# THREE_SIGMA_TIME = 3600
# BIAS = 1.0 - math.exp((-1.0 * DELTA)/((-1.0*THREE_SIGMA_TIME)/math.log(1.0-THREE_SIGMA_VALUE)))

BIAS = round(BIAS, 5)

def main():
    num_measures = math.ceil(TIME/DELTA)
    tau = -1.0 * (DELTA / math.log(1.0-BIAS))
    sigma = -1.0 * tau * math.log(1.0-SIGMA_VALUE)
    three_sigma = -1.0 * tau * math.log(1.0-THREE_SIGMA_VALUE)
    period = 2.0 * math.pi * tau
    print(f"Bias: {BIAS:.5f}\nTotal Measures: {num_measures} ({TIME}s)\n"
          f"Tau: {tau:.3f}s ({(tau/DELTA):.2f} measures)\n"
          f"Recovery time: {(5*tau):.3f}s ({((5*tau)/DELTA):.2f} measures)\n"
          f"Cutoff period: {period:.3f}s\n"
          f"Sigma: {sigma:.3f}s ({(sigma/DELTA):.2f} measures)\n"
          f"3 Sigma: {three_sigma:.3f}s ({(three_sigma/DELTA):.2f} measures)")


if __name__ == "__main__":
    main()
