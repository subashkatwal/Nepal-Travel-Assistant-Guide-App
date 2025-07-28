# import pandas as pd
# import pickle
# from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
# from sklearn.neighbors import NearestNeighbors

# # Load dataset
# df = pd.read_csv("travel_backend\core\costPrediction\cleaned_destinations.csv")[['city', 'category', 'estimated_cost']]

# # Encode & Scale
# encoder = OneHotEncoder()
# encoded_category = encoder.fit_transform(df[['category']]).toarray()

# scaler = MinMaxScaler()
# df['scaled_cost'] = scaler.fit_transform(df[['estimated_cost']])

# # Train Model
# X = pd.concat([pd.DataFrame(encoded_category), df[['scaled_cost']]], axis=1)
# X.columns = X.columns.astype(str)

# model = NearestNeighbors(n_neighbors=10, metric='euclidean')
# model.fit(X)

# # Save everything
# with open("recommendation_model.pkl", "wb") as f:
#     pickle.dump((df, encoder, scaler, model), f)

# print("Model saved successfully!")
