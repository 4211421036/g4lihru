library(ggplot2)
library(GA)
library(pracma)

# Fungsi untuk menghasilkan sekuens bit mentah
generate_raw_bits <- function(n) {
  return(sample(c(0, 1), n, replace = TRUE))
}

# Fitness function untuk algoritma genetika
fitness_function <- function(bits) {
  return(-sum(abs(diff(bits)))) # Optimasi agar memiliki variasi antara bit-bit berurutan
}

# Fungsi untuk post-processing optimization dengan algoritma genetika
optimize_bits_genetic <- function(bits) {
  result <- ga(type = "binary", fitness = fitness_function, popSize = 50, nBits = length(bits), maxiter = 50)
  return(as.integer(result@solution))
}

# Menghitung entropi dari urutan bit
calculate_entropy <- function(bits) {
  probs <- table(bits) / length(bits)
  return(-sum(probs * log2(probs)))
}

# Simulasi
n <- 100
raw_bits <- generate_raw_bits(n)
optimized_bits <- optimize_bits_genetic(raw_bits)

# Visualisasi
df <- data.frame(Position = 1:n, 
                 Raw = raw_bits, 
                 Optimized = optimized_bits)

plot <- ggplot(df, aes(x = Position)) +
  geom_line(aes(y = Raw, color = "Raw Bits"), size = 1) +
  geom_line(aes(y = Optimized, color = "Optimized Bits"), linetype = "dashed", size = 1) +
  labs(title = "Comparison of Raw and Optimized Bit Sequences",
       y = "Bit Value",
       x = "Position",
       color = "Legend") +
  theme_minimal()

print(plot)

# Analisis entropi
raw_entropy <- calculate_entropy(raw_bits)
optimized_entropy <- calculate_entropy(optimized_bits)

cat("Entropy of Raw Bits:", raw_entropy, "\n")
cat("Entropy of Optimized Bits:", optimized_entropy, "\n")

# Simulasi metode QKD BB84 (seperti yang didefinisikan sebelumnya)
raw_bits <- bb84_simulation(1000)

# Tes Frequency
frequency_test <- function(bits) {
  Sobs <- abs(sum(2*bits - 1)) / sqrt(length(bits))
  p_value <- exp(-Sobs * Sobs / 2.0)
  return(p_value)
}

# Tes Block Frequency
block_frequency_test <- function(bits, block_size = 128) {
  n <- length(bits)
  M = block_size
  N = floor(n/M)  # adjusted to floor to get integer value
  blocks = matrix(bits[1:(N*M)], ncol = M)  # use only first N*M bits to fit into the matrix
  block_sums = rowSums(blocks)
  block_averages = block_sums / M
  chi_squared = sum((block_averages - 0.5)^2 / 0.5)
  p_value = 1 - pchisq(chi_squared, df = N)
  return(p_value)
}

# Tes Runs
runs_test <- function(bits) {
  n = length(bits)
  pi = mean(bits)
  tau = 2/sqrt(n)
  if (abs(pi - 0.5) >= tau) {
    return(0)
  }
  vobs = sum(abs(diff(bits))) + 1
  p_value = erfc(abs(vobs - 2*n*pi*(1-pi)) / (2*sqrt(2*n)pi(1-pi)))
  return(p_value)
}

# Longest Run of Ones in a Block
longest_run_ones_test <- function(bits) {
  rle_bits <- rle(bits)
  max_run <- max(rle_bits$lengths[rle_bits$values == 1])
  n <- length(bits)
  
  if (n < 6272) {
    pi <- c(0.2176, 0.4182, 0.2431, 0.0891, 0.0237, 0.0081)
    thresholds <- 1:6
  } else if (n < 750000) {
    pi <- c(0.1174, 0.2435, 0.2493, 0.1752, 0.1027, 0.1124)
    thresholds <- 4:9
  } else {
    pi <- c(0.0882, 0.2092, 0.2483, 0.1933, 0.1208, 0.1423)
    thresholds <- 5:10
  }
  
  v <- numeric(6)
  v[which.max(max_run <= thresholds)] <- 1
  
  p_value <- sum(pi * v)
  
  return(p_value)
}

# Random Excursions Test
random_excursions_test <- function(bits) {
  x <- 2 * bits - 1
  s <- c(0, cumsum(x))
  occurrences <- table(s)
  total_occurrences <- sum(occurrences)
  expected <- occurrences / total_occurrences * length(bits)
  chisq <- sum((occurrences - expected)^2 / expected)
  p_value <- 1 - pchisq(chisq, df = length(occurrences) - 1)
  return(p_value)
}

random_excursions_variant_test <- function(bits) {
  x <- 2 * bits - 1
  s <- c(0, cumsum(x))
  occurrences <- table(s)
  
  states <- c(-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9)
  observed <- as.numeric(occurrences[as.character(states)])
  observed[is.na(observed)] <- 0
  
  # Mendefinisikan expected dengan menggunakan distribusi empiris dari s
  total_occurrences <- sum(occurrences)
  expected_states <- occurrences[as.character(states)]
  expected_states[is.na(expected_states)] <- 0
  expected <- expected_states / total_occurrences * length(bits)

  chisq <- sum((observed - expected)^2 / expected)
  p_value <- 1 - pchisq(chisq, df = length(states) - 1)
  return(p_value)
}

# Menghasilkan data
raw_bits <- generate_raw_bits(1000)

# Tabel hasil
results <- data.frame(
  StatisticalTest = c("Frequency", "Block Frequency", "Runs", "Longest Run of Ones in a Block", 
                      "Universal", "Random Excursions", "Random Excursions Variants", "Linear Complexity"),
  Pvalue = c(
    frequency_test(raw_bits),
    block_frequency_test(raw_bits),
    runs_test(raw_bits),
    longest_run_ones_test(raw_bits),
    NA, # Placeholder untuk Universal Test yang belum ditambahkan
    random_excursions_test(raw_bits),
    random_excursions_variant_test(raw_bits),
    NA # Placeholder untuk Linear Complexity Test
  )
)

print(results)